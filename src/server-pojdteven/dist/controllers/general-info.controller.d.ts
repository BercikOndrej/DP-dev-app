import { PageType } from '../enums';
import { GeneralInfo } from '../models';
import { GeneralInfoService } from '../services';
export declare class GeneralInfoController {
    private generaInfoService;
    constructor(generaInfoService: GeneralInfoService);
    createInfo(generalInfo: Omit<GeneralInfo, 'id'>): Promise<GeneralInfo>;
    getInfo(page: PageType): Promise<GeneralInfo[]>;
    getInfoById(id: number): Promise<GeneralInfo>;
    getNextPositionOfInfoOnPage(page: PageType): Promise<number>;
    updateInfo(id: number, generalInfo: GeneralInfo): Promise<void>;
    deleteInfo(id: number): Promise<void>;
}
