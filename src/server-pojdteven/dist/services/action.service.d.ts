/// <reference types="express" />
import { Request } from '@loopback/rest';
import { Action } from '../models';
import { ActionRepository } from '../repositories';
import { FileUploadService } from './file-upload.service';
export declare const STATIC_FILES_ACTIONS_PATH = "static/actions/";
export declare class ActionService {
    private actionRepo;
    private fileUploadService;
    constructor(actionRepo: ActionRepository, fileUploadService: FileUploadService);
    getAction(id: string): Promise<Action>;
    getActions(): Promise<Action[]>;
    updateAction(id: string, action: Action): Promise<void>;
    createAction(request: Request): Promise<Action>;
    deleteAction(id: string): Promise<void>;
}
