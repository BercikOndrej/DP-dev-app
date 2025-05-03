import { BindingScope, injectable } from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import z from 'zod';
import { PageType } from '../enums';
import { GeneralInfo } from '../models';
import { GeneralInfoRepository } from '../repositories';

@injectable({ scope: BindingScope.TRANSIENT })
export class GeneralInfoService {
  constructor(
    @repository(GeneralInfoRepository)
    private generalInfoRepo: GeneralInfoRepository,
  ) {}

  // Create info
  async createInfo(info: Omit<GeneralInfo, 'id'>): Promise<GeneralInfo> {
    if (info.page) {
      this.validatePageType(info.page);
    }
    return this.generalInfoRepo.create(info);
  }

  // Update info
  async updateInfo(id: number, info: GeneralInfo): Promise<void> {
    if (info.page) {
      this.validatePageType(info.page);
    }
    await this.generalInfoRepo.updateById(id, info);
  }

  // Delete info
  async deleteInfo(id: number): Promise<void> {
    await this.generalInfoRepo.deleteById(id);
  }

  // Get info by Id
  async getInfoById(id: number): Promise<GeneralInfo> {
    return this.generalInfoRepo.findById(id);
  }

  async getNextPositionOfInfoOnPage(page: PageType): Promise<number> {
    const infoItems = await this.getWholeInfo(page);
    return (
      Math.max(
        ...infoItems
          .map((info) => info.position)
          .filter((position): position is number => position !== undefined),
      ) + 1
    );
  }

  // Get whole info
  async getWholeInfo(page?: PageType): Promise<GeneralInfo[]> {
    if (page) {
      this.validatePageType(page);

      // Return all info with given page type and pageType equals undefined
      const index = Object.values(PageType).findIndex(
        (value) => value !== page,
      );
      const otherPage = Object.values(PageType)[index];

      return this.generalInfoRepo.find({
        where: {
          page: {
            neq: otherPage,
          },
        },
        order: ['position ASC'],
      });
    } else {
      return this.generalInfoRepo.find({
        order: ['position ASC'],
      });
    }
  }

  // Validate page tag
  private validatePageType(page: string) {
    const PageTypeEnum = z.nativeEnum(PageType);
    type PageTypeEnum = z.infer<typeof PageTypeEnum>;

    const { error } = PageTypeEnum.safeParse(page);
    if (error) {
      throw new HttpErrors.BadRequest(
        `Vlastnost Page musí být jedna z těchto hodnot: ${Object.values(PageType)}`,
      );
    }
  }
}
