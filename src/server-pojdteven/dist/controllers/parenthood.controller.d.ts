import { Parenthood } from '../models';
import { ParenthoodService } from '../services';
export declare class ParenthoodController {
    private parenthoodService;
    constructor(parenthoodService: ParenthoodService);
    createParenthood(parenthood: Omit<Parenthood, 'id'>): Promise<Parenthood>;
    deleteParenthood(id: string): Promise<void>;
    getAllParenthoodItems(): Promise<Parenthood[]>;
    getUserParenthoodItems(userId: string): Promise<Parenthood[]>;
}
