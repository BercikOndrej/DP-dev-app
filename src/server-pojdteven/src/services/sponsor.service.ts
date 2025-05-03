import { BindingScope, injectable, service } from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors, Request } from '@loopback/rest';
import { Sponsor } from '../models';
import { SponsorRepository } from '../repositories';
import { FileUploadService } from './file-upload.service';

const STATIC_FILES_SPONSORS_PATH = 'static/sponsors/';

@injectable({ scope: BindingScope.TRANSIENT })
export class SponsorService {
  constructor(
    @repository(SponsorRepository) private sponsorRepo: SponsorRepository,
    @service(FileUploadService) private fileUploadService: FileUploadService,
  ) {}

  // Create sponsor
  async createSponsor(sponsor: Omit<Sponsor, 'id'>): Promise<Sponsor> {
    sponsor.imagePath = '';
    return this.sponsorRepo.create(sponsor);
  }

  // Upload sponsor image
  async uploadSponsorImage(id: string, request: Request): Promise<void> {
    const sponsor = await this.sponsorRepo.findById(id);
    if (!sponsor) {
      throw HttpErrors.NotFound('Sponzor nebyl nalezen.');
    }

    const filename = `sponsor-${sponsor.id}`;
    try {
      const files = await this.fileUploadService.processFileUpload(
        request,
        STATIC_FILES_SPONSORS_PATH,
        filename,
        true,
      );
      sponsor.imagePath = STATIC_FILES_SPONSORS_PATH + files[0].filename;
      this.updateSponsor(sponsor.id!, sponsor);
    } catch (error) {
      throw HttpErrors.BadRequest(`Chyba při načítání obrázku: ${error}.`);
    }
  }

  // Delete sponsor
  async deleteSponsor(id: string): Promise<void> {
    if (!(await this.sponsorRepo.exists(id))) {
      throw HttpErrors.NotFound('Sponzor nebyl nalezen.');
    }

    const regex = new RegExp(`^sponsor-${id}\\.[a-zA-Z]+$`);
    await this.fileUploadService.deleteFile(regex, STATIC_FILES_SPONSORS_PATH);

    this.sponsorRepo.deleteById(id);
  }

  // Update Sponsor
  async updateSponsor(id: string, sponsor: Sponsor): Promise<void> {
    return this.sponsorRepo.updateById(id, sponsor);
  }

  // Get sponsor
  async getSponsor(id: string): Promise<Sponsor> {
    return this.sponsorRepo.findById(id);
  }

  // Get all sponsors
  async getSponsors(): Promise<Sponsor[]> {
    return this.sponsorRepo.find();
  }
}
