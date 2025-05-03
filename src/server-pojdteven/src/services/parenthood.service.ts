import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Parenthood} from '../models';
import {
  ChildRepository,
  ParenthoodRepository,
  UserRepository,
} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ParenthoodService {
  constructor(
    @repository(ChildRepository) private childRepo: ChildRepository,
    @repository(ParenthoodRepository)
    private parenthoodRepo: ParenthoodRepository,
    @repository(UserRepository) private userRepo: UserRepository,
  ) {}

  // Create parenthood relationship
  async createParenthood(
    parenthood: Omit<Parenthood, 'id'>,
  ): Promise<Parenthood> {
    if (!(await this.childRepo.exists(parenthood.childId))) {
      throw HttpErrors.NotFound('Dítě nebylo nalezeno.');
    }
    if (!(await this.userRepo.exists(parenthood.userId))) {
      throw HttpErrors.NotFound('Uživatel nebyl nalezen.');
    }
    return this.parenthoodRepo.create(parenthood);
  }

  // Delete all relations of child
  async deleteAllChildRelations(id: string): Promise<void> {
    if (!(await this.childRepo.exists(id))) {
      throw HttpErrors.NotFound('Dítě nebylo nalezeno.');
    }

    await this.parenthoodRepo.deleteAll({
      childId: id,
    });
  }

  // Delete all user relations
  async deleteAllUserRelations(id: string): Promise<void> {
    if (!(await this.userRepo.exists(id))) {
      throw HttpErrors.NotFound('Uživatel nenalezen.');
    }
    await this.parenthoodRepo.deleteAll({userId: id});
  }

  // Delete parenthood relation
  async deleteParenthood(id: string): Promise<void> {
    if (!(await this.parenthoodRepo.exists(id))) {
      throw HttpErrors.NotFound('Vztah rodičovství nebyl nalezen.');
    }

    await this.parenthoodRepo.deleteById(id);
  }

  // Get all parenthood items
  async getAllParenthoodItems(): Promise<Parenthood[]> {
    return this.parenthoodRepo.find();
  }

  // Get user parenthood items
  async getUserParenthoodItems(userId: string): Promise<Parenthood[]> {
    return this.parenthoodRepo.find({
      where: {
        userId: userId,
      },
    });
  }
}
