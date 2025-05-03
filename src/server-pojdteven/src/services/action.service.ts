import { BindingScope, injectable, service } from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors, Request } from '@loopback/rest';
import { Action } from '../models';
import { ActionRepository } from '../repositories';
import { FileUpload, FileUploadService } from './file-upload.service';

export const STATIC_FILES_ACTIONS_PATH = 'static/actions/';

@injectable({ scope: BindingScope.TRANSIENT })
export class ActionService {
  constructor(
    @repository(ActionRepository) private actionRepo: ActionRepository,
    @service(FileUploadService) private fileUploadService: FileUploadService,
  ) {}

  // Get one action
  async getAction(id: string): Promise<Action> {
    return this.actionRepo.findById(id);
  }

  // Get all actions
  async getActions(): Promise<Action[]> {
    return this.actionRepo.find();
  }

  // Update action
  async updateAction(id: string, action: Action): Promise<void> {
    await this.actionRepo.updateById(id, action);
  }

  // Create action
  async createAction(request: Request): Promise<Action> {
    let action = new Action();
    action = await this.actionRepo.create(action);

    const filename = `action-${action.id}`;
    try {
      const files: FileUpload[] =
        await this.fileUploadService.processFileUpload(
          request,
          STATIC_FILES_ACTIONS_PATH,
          filename,
          true,
        );
      action.imagePath = STATIC_FILES_ACTIONS_PATH + files[0].filename;
      await this.updateAction(action.id!, action);
    } catch (error) {
      await this.actionRepo.deleteById(action.id!);
      throw HttpErrors.BadRequest(`Chyba při uploadu obrázku: ${error}.`);
    }

    return action;
  }

  // Delete action Image
  async deleteAction(id: string): Promise<void> {
    if (!(await this.actionRepo.exists(id))) {
      throw HttpErrors.NotFound('Akce nenalezena.');
    }
    const regex = new RegExp(`^action-${id}\\.[a-zA-Z]+$`);
    await this.fileUploadService.deleteFile(regex, STATIC_FILES_ACTIONS_PATH);
    await this.actionRepo.deleteById(id);
  }
}
