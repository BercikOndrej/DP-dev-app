import { PageType } from '../enums';
import { GeneralInfo } from '../models';
import { GeneralInfoRepository } from '../repositories';
export declare class GeneralInfoService {
    private generalInfoRepo;
    constructor(generalInfoRepo: GeneralInfoRepository);
    createInfo(info: Omit<GeneralInfo, 'id'>): Promise<GeneralInfo>;
    updateInfo(id: number, info: GeneralInfo): Promise<void>;
    deleteInfo(id: number): Promise<void>;
    getInfoById(id: number): Promise<GeneralInfo>;
    getNextPositionOfInfoOnPage(page: PageType): Promise<number>;
    getWholeInfo(page?: PageType): Promise<GeneralInfo[]>;
    private validatePageType;
}
