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
    categoryId?: string;
}

export class EAccount implements IEAccount {
    constructor(
        public id?: string,
        public accountCode?: string,
        public accountName?: string,
        public type?: AccountType,
        public categoryId?: string
    ) {}
}
