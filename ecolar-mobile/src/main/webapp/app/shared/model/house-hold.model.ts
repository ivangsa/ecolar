import { IAccountCategories } from '@/shared/model//account-categories.model';
import { IUser } from '@/shared/model//user.model';

export interface IHouseHold {
    id?: string;
    name?: string;
    accountCategories?: IAccountCategories;
    members?: IUser[];
}

export class HouseHold implements IHouseHold {
    constructor(public id?: string, public name?: string, public accountCategories?: IAccountCategories, public members?: IUser[]) {}
}
