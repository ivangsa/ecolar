import { IAccountCategory } from 'app/shared/model//account-category.model';

export interface IAccounts {
    id?: string;
    accountCode?: string;
    accountName?: string;
    category?: IAccountCategory;
}

export class Accounts implements IAccounts {
    constructor(public id?: string, public accountCode?: string, public accountName?: string, public category?: IAccountCategory) {}
}
