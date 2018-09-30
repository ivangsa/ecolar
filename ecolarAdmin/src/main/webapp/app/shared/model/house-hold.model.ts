import { IAccountsDocument } from 'app/shared/model//accounts-document.model';
import { IUser } from 'app/core/user/user.model';

export interface IHouseHold {
    id?: string;
    name?: string;
    accountsDocument?: IAccountsDocument;
    members?: IUser[];
}

export class HouseHold implements IHouseHold {
    constructor(public id?: string, public name?: string, public accountsDocument?: IAccountsDocument, public members?: IUser[]) {}
}
