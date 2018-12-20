import { ICategory } from '@/shared/model//category.model';
import { IHouseHold } from '@/shared/model//house-hold.model';

export interface IAccountCategories {
    id?: string;
    categories?: ICategory[];
    household?: IHouseHold;
}

export class AccountCategories implements IAccountCategories {
    constructor(public id?: string, public categories?: ICategory[], public household?: IHouseHold) {}
}
