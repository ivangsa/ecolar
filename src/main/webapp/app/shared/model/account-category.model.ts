import { IAccounts } from 'app/shared/model//accounts.model';
import { IAccountCategory } from 'app/shared/model//account-category.model';

export interface IAccountCategory {
    id?: string;
    name?: string;
    description?: string;
    accounts?: IAccounts[];
    parent?: IAccountCategory;
    categories?: IAccountCategory[];
}

export class AccountCategory implements IAccountCategory {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public accounts?: IAccounts[],
        public parent?: IAccountCategory,
        public categories?: IAccountCategory[]
    ) {}
}
