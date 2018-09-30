import { ICategory } from 'app/shared/model//category.model';
import { IHouseHold } from 'app/shared/model//house-hold.model';

export interface IAccountsDocument {
    id?: string;
    categories?: ICategory[];
    household?: IHouseHold;
}

export class AccountsDocument implements IAccountsDocument {
    constructor(public id?: string, public categories?: ICategory[], public household?: IHouseHold) {}
}
