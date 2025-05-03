/// <reference types="express" />
import { Request } from '@loopback/rest';
import { Action } from '../models';
import { ActionService } from '../services';
export declare class ActionController {
    private actionService;
    constructor(actionService: ActionService);
    createAction(request: Request): Promise<Action>;
    getActions(): Promise<Action[]>;
    getAction(id: string): Promise<Action>;
    deleteAction(id: string): Promise<void>;
}
