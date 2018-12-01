import { IEAccount } from './e-account.model';
import { ICategory } from './category.model';
import { IAccountCategories } from './account-categories.model';

export const enum AccountType {
    ASSETS = 'ASSETS',
    LIABILITIES = 'LIABILITIES',
    REVENUE = 'REVENUE',
    EXPENSE = 'EXPENSE'
}

export interface ICategory {
    id?: string;
    name?: string;
    description?: string;
    path?: string;
    parentId?: string;
    accountType?: AccountType;
    accounts?: IEAccount[];
    categories?: ICategory[];
}

export class Category implements ICategory {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public path?: string,
        public parentId?: string,
        public accountType?: AccountType,
        public accounts?: IEAccount[],
        public categories?: ICategory[]
    ) {}
}
