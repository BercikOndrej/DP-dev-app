/// <reference types="express" />
import { Request } from '@loopback/rest';
import { Sponsor } from '../models';
import { SponsorRepository } from '../repositories';
import { FileUploadService } from './file-upload.service';
export declare class SponsorService {
    private sponsorRepo;
    private fileUploadService;
    constructor(sponsorRepo: SponsorRepository, fileUploadService: FileUploadService);
    createSponsor(sponsor: Omit<Sponsor, 'id'>): Promise<Sponsor>;
    uploadSponsorImage(id: string, request: Request): Promise<void>;
    deleteSponsor(id: string): Promise<void>;
    updateSponsor(id: string, sponsor: Sponsor): Promise<void>;
    getSponsor(id: string): Promise<Sponsor>;
    getSponsors(): Promise<Sponsor[]>;
}
