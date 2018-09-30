import { IEAccount } from 'app/shared/model//e-account.model';
import { ICategory } from 'app/shared/model//category.model';
import { IAccountsDocument } from 'app/shared/model//accounts-document.model';

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
    parent?: ICategory;
    document?: IAccountsDocument;
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
        public parent?: ICategory,
        public document?: IAccountsDocument,
        public categories?: ICategory[]
    ) {}
}