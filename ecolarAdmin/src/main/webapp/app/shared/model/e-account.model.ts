import { ICategory } from 'app/shared/model//category.model';

export const enum AccountType {
    ASSETS = 'ASSETS',
    LIABILITIES = 'LIABILITIES',
    REVENUE = 'REVENUE',
    EXPENSE = 'EXPENSE'
}

export interface IEAccount {
    id?: string;
    accountCode?: string;
    accountName?: string;
    type?: AccountType;
    category?: ICategory;
}

export class EAccount implements IEAccount {
    constructor(
        public id?: string,
        public accountCode?: string,
        public accountName?: string,
        public type?: AccountType,
        public category?: ICategory
    ) {}
}
