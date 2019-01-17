import { IEAccount, AccountType } from '@/shared/model//e-account.model';
import { ICategory } from '@/shared/model//category.model';
import { IAccountCategories } from '@/shared/model//account-categories.model';

export interface ICategory {
    id?: string;
    name?: string;
    description?: string;
    path?: string;
    parentId?: string;
    accountType?: AccountType;
    accounts?: IEAccount[];
    parent?: ICategory;
    document?: IAccountCategories;
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
        public document?: IAccountCategories,
        public categories?: ICategory[]
    ) {}
}
