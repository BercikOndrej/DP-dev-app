/// <reference types="express" />
import { Request } from '@loopback/rest';
import { Sponsor } from '../models';
import { SponsorService } from '../services';
export declare class SponsorController {
    private sponsorService;
    constructor(sponsorService: SponsorService);
    createSponsor(sponsor: Omit<Sponsor, 'id' | 'imagePath'>): Promise<Sponsor>;
    updateSponsor(id: string, sponsor: Sponsor): Promise<void>;
    uploadSponsorImage(id: string, request: Request): Promise<void>;
    deleteSponsor(id: string): Promise<void>;
    getSponsor(id: string): Promise<Sponsor>;
    getSponsors(): Promise<Sponsor[]>;
}
