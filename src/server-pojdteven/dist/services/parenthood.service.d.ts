import { Parenthood } from '../models';
import { ChildRepository, ParenthoodRepository, UserRepository } from '../repositories';
export declare class ParenthoodService {
    private childRepo;
    private parenthoodRepo;
    private userRepo;
    constructor(childRepo: ChildRepository, parenthoodRepo: ParenthoodRepository, userRepo: UserRepository);
    createParenthood(parenthood: Omit<Parenthood, 'id'>): Promise<Parenthood>;
    deleteAllChildRelations(id: string): Promise<void>;
    deleteAllUserRelations(id: string): Promise<void>;
    deleteParenthood(id: string): Promise<void>;
    getAllParenthoodItems(): Promise<Parenthood[]>;
    getUserParenthoodItems(userId: string): Promise<Parenthood[]>;
}
