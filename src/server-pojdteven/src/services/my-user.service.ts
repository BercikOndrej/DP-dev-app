import { UserService } from '@loopback/authentication';
import { TokenServiceBindings } from '@loopback/authentication-jwt';
import { BindingScope, inject, injectable, service } from '@loopback/core';
import { Filter, repository } from '@loopback/repository';
import { HttpErrors, Request } from '@loopback/rest';
import { securityId } from '@loopback/security';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/cs';
import { z } from 'zod';
import { Role } from '../enums';
import { Address, Child, User, UserWithRelations } from '../models';
import { UserRepository } from '../repositories';
import { AttendanceService } from './attendance.service';
import { EmailService } from './email.service';
import { FileUpload, FileUploadService } from './file-upload.service';
import { MyTokenService, MyUserProfile } from './my-token.service';
import { ParenthoodService } from './parenthood.service';
import { NewUserObject } from '../controllers';

export type Credentials = {
  email: string;
  password: string;
};

const STATIC_FILES_USERS_PATH = 'static/users/';

@injectable({ scope: BindingScope.TRANSIENT })
export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) private userRepo: UserRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: MyTokenService,
    @service(FileUploadService) private fileUploadService: FileUploadService,
    @service(EmailService) private emailService: EmailService,
    @service(ParenthoodService) private parenthoodService: ParenthoodService,
    @service(AttendanceService) private attendanceService: AttendanceService,
  ) {}

  // Clasic CRUD operation
  // ---------------------------------------------------------------------

  // Create user
  async createUser(newUser: Omit<User, 'id' | 'imagePath'>): Promise<User> {
    this.validateNewUser(newUser);

    const user = { imagePath: '', ...newUser };
    return this.userRepo.create(user);
  }

  // Delete user
  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw HttpErrors.NotFound('Uživatel nebyl nalezen.');
    }

    if (user.imagePath) {
      await this.deleteUserImage(id);
    }
    if (user.role === Role.TEACHER) {
      await this.attendanceService.deleteAllAttendanceItemsOfUser(id);
    }
    await this.userRepo.userCredentials(id).delete();
    await this.userRepo.address(id).delete();
    await this.parenthoodService.deleteAllUserRelations(id);
    await this.userRepo.deleteById(id);
  }

  // Delete user image
  async deleteUserImage(id: string) {
    const regex = new RegExp(`^user-${id}\\.[a-zA-Z]+$`);
    await this.fileUploadService.deleteFile(regex, STATIC_FILES_USERS_PATH);
  }

  // Upload image for a user
  async uploadUserImage(request: Request, id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw HttpErrors.NotFound('Uživatel nebyl nalezen');
    }

    if (user.imagePath) {
      await this.deleteUserImage(id);
    }

    const fileName = `user-${id}`;
    try {
      const files: FileUpload[] =
        await this.fileUploadService.processFileUpload(
          request,
          STATIC_FILES_USERS_PATH,
          fileName,
          true,
        );
      user.imagePath = STATIC_FILES_USERS_PATH + files[0].filename;
      await this.userRepo.updateById(id, user);
    } catch (error) {
      throw HttpErrors.BadRequest(`Chyba při uploadu obrázku: ${error}`);
    }
  }

  // Update user
  async updateUser(id: string, user: User): Promise<void> {
    this.validateNewUser(user);
    if (!user.academicTitle) {
      user.academicTitle = undefined;
    }
    await this.userRepo.updateById(id, user);
  }

  // Update user without executing validation
  async updateUserWithoutValidation(id: string, user: User): Promise<void> {
    await this.userRepo.updateById(id, user);
  }

  // Update address of user
  async updateUserAddress(id: string, address: Address): Promise<void> {
    this.validateAddress(address);
    await this.userRepo.address(id).patch(address);
  }

  // Change user password
  async changeUserPassword(
    id: string,
    actualPassword: string,
    newPassword: string,
  ): Promise<void> {
    const userCredentials = await this.userRepo.userCredentials(id).get();

    const passwordMatched = await bcrypt.compare(
      actualPassword,
      userCredentials.password,
    );
    if (!passwordMatched) {
      throw HttpErrors.BadRequest('Nesprávé aktuální heslo.');
    }
    await this.savedNewPassword(id, newPassword);
  }

  // Saved new password
  async savedNewPassword(id: string, password: string): Promise<void> {
    this.validatePassword(password);
    const hashedPassword = await this.hashPassword(password);
    await this.userRepo.userCredentials(id).patch({ password: hashedPassword });
  }

  // Get user
  async getUser(id: string): Promise<UserWithRelations> {
    const user = await this.userRepo.findOne({
      include: ['address'],
      where: {
        id: id,
      },
    });

    if (!user) {
      throw HttpErrors.NotFound('Uživatel nebyl nalezen.');
    }

    return user;
  }

  // Find user by filter
  async findUser(filter: Filter<User>): Promise<User | null> {
    return this.userRepo.findOne(filter);
  }

  // Get all users filtered by userRole
  async getUsers(): Promise<User[]> {
    return this.userRepo.find({
      where: {
        role: Role.USER,
      },
      include: ['children'],
    });
  }

  // Get teachers
  async getTeachers(): Promise<User[]> {
    return this.userRepo.find({
      where: {
        or: [{ role: Role.TEACHER }, { role: Role.ADMIN }],
      },
    });
  }

  // Get all user's children
  async getChildren(id: string): Promise<Child[]> {
    if (!(await this.userRepo.exists(id))) {
      throw HttpErrors.NotFound('Uživatel nebyl nalezen');
    }
    return this.userRepo.children(id).find();
  }

  // Get teachers with an attendance on given date
  async getWorkingTeachersOnDate(date: string): Promise<User[]> {
    const attendanceItems = (
      await this.attendanceService.getAllAttendanceItemsOnDate(date)
    ).filter((att) => !att.childId && att.userId);

    const teachers: User[] = [];
    for (const attendance of attendanceItems) {
      const teacher = await this.userRepo.findById(attendance.userId!);
      if (attendance.pickUp) {
        teacher.fullName += ' (svoz)';
      }
      teachers.push(teacher);
    }
    return teachers;
  }

  // Other functions
  // ---------------------------------------------------------------------

  // Function for login a user
  async login(credentials: Credentials): Promise<{ token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return { token };
  }

  // Function for get info about current user
  async whoAmI(currentUserProfile: MyUserProfile): Promise<string> {
    // Now I just returned only id of user, but you can return all user profile
    if (!currentUserProfile) {
      throw new HttpErrors.Unauthorized(`Uživatel se ještě nepřihlásil`);
    }
    return currentUserProfile[securityId];
  }

  // Function for sign up a user
  async signup(newUserRequest: NewUserObject): Promise<User> {
    // Extraction of password, address and user
    const { password, address, ...newUser } = newUserRequest;

    // Validate password
    this.validatePassword(password);

    // Hashing password
    const hashedPassword = await this.hashPassword(password);

    // Validate address
    this.validateAddress(address);

    // Validate user
    this.validateNewUser(newUser as User);

    // Validate unique email address
    await this.validateUniqueEmail(newUser.email);

    // Create user
    const savedUser = await this.userRepo.create(newUser);

    // Save address
    await this.userRepo.address(savedUser.id).create(address);

    // Save credentials
    await this.userRepo
      .userCredentials(savedUser.id)
      .create({ password: hashedPassword });

    await this.emailService.sendGeneratedPasswordToNewUser(
      savedUser.email,
      password,
    );

    return savedUser;
  }

  // UserService methods
  // ----------------------------------------------------------------------

  // Function for vertify user by his credentials
  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Neplatný email nebo heslo.';

    const foundUser = await this.userRepo.findOne({
      where: { email: credentials.email },
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepo.findCredentials(foundUser.id);
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await bcrypt.compare(
      credentials.password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    return foundUser;
  }

  // Function to convert user to user profile
  convertToUserProfile(user: User): MyUserProfile {
    return {
      [securityId]: user.id.toString(),
      id: user.id,
      email: user.email,
      role: user.role!,
      fullName: user.fullName,
    };
  }

  // Validation
  // ----------------------------------------------------------------------
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }

  // Password validation
  validatePassword(passwd: string) {
    const schema = z
      .string()
      .min(8, { message: 'Heslo musí obsahovat minimálně 8 znaků.' })
      .max(15, { message: 'Heslo může obsahovat maximálně 15 znaků.' })
      .regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message:
          'Heslo musí obsahovat alespoň jedno velké písmeno a alespoň jednu číslici.',
      });
    const { error } = schema.safeParse(passwd);
    if (error) {
      throw new HttpErrors.UnprocessableEntity(
        `Neplatné heslo: ${error.errors[0].message}`,
      );
    }
  }

  // Address validation
  validateAddress(address: Omit<Address, 'id'>) {
    const houseNumberRegex = /^[1-9]\d*(?:\/\d+)?$/;
    const zipCodeRegex = /^[1-9]\d{2} \d{2}$/;

    const addressSchema = z.object({
      street: z.string().optional(),
      houseNumber: z.string().regex(houseNumberRegex),
      city: z.string(),
      zipCode: z.string().regex(zipCodeRegex, {
        message: "Zip musí mít být ve tvaru 'NNN NN'.",
      }),
      note: z.string().optional(),
    });

    const { error } = addressSchema.safeParse(address);
    if (error) {
      throw HttpErrors.UnprocessableEntity(
        `Neplatná adresa: ${error.errors[0].message}.`,
      );
    }
  }

  // Unique email validation
  async validateUniqueEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      throw HttpErrors.UnprocessableEntity(
        'Tato emailová adresa je již používaná.',
      );
    }
  }

  // newUser validation
  validateNewUser(
    user: Omit<User, 'id' | 'imagePath' | 'address' | 'userCredentials'>,
  ) {
    const CZECH_BIG_LETTERS = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
    const CZECH_SMALL_LETTERS = 'áčďéěíňóřšťúůýž';
    const nameRegex = new RegExp(
      `^[A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+(?: [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+)? [A-Z${CZECH_BIG_LETTERS}][a-z${CZECH_SMALL_LETTERS}]+$`,
      'g',
    );
    const phoneRegex = /^\+?[0-9]{3}(?: [0-9]{3}){2,3}$/;
    const dateFormat = 'YYYY-MM-DD';

    const userSchema = z.object({
      email: z.string().email({ message: 'Neplatná emailová adresa.' }),
      role: z
        .nativeEnum(Role, {
          message: 'Neplatná uživatelská role.',
        })
        .optional(),
      fullName: z.string().regex(nameRegex, {
        message: 'Neplatné jméno.',
      }),
      dateOfBirth: z
        .string()
        .date(`Neplatné datum. Datum musí mít tento formát: ${dateFormat}.`)
        .refine(this.isAdult, {
          message: 'Uživatel musí být starší 18 let.',
        })
        .optional(),
      description: z.string().optional(),
      academicTitle: z
        .string()
        .max(20, { message: 'Toto pole je příliš dlouhé.' })
        .optional(),
      phoneNumber: z
        .string()
        .regex(phoneRegex, { message: 'Neplatné telefoní číslo' }),
      note: z.string().optional(),
    });

    const { error } = userSchema.safeParse(user);
    if (error) {
      console.log(error);
      throw HttpErrors.UnprocessableEntity(error.errors[0].message);
    }
  }

  // Validate age is higher than 18 years old from date
  isAdult(dateStr: string): boolean {
    const date = dayjs(dateStr)
      .locale({
        ...locale,
      })
      .startOf('day');
    const today = dayjs()
      .locale({
        ...locale,
      })
      .startOf('day');

    return date.isSameOrBefore(today, 'day');
  }
}
