import { ICategory } from './category.model';
import { IHouseHold } from './house-hold.model';

export interface IAccountCategories {
    id?: string;
    categories?: ICategory[];
    household?: IHouseHold;
}

export class AccountCategories implements IAccountCategories {
    constructor(public id?: string, public categories?: ICategory[], public household?: IHouseHold) {}
}
