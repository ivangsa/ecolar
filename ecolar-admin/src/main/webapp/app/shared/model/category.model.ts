import { IEAccount } from 'app/shared/model//e-account.model';
import { ICategory } from 'app/shared/model//category.model';
import { IAccountCategories } from 'app/shared/model//account-categories.model';

export const enum AccountType {
    ASSETS = 'ASSETS',
    LIABILITIES = 'LIABILITIES',
    REVENUE = 'REVENUE',
    EXPENSE = 'EXPENSE'
}

export interface ICategory {
    id?: string;
    name?: string;
    description?: string;
    path?: string;
    parentId?: string;
    accountType?: AccountType;
    accounts?: IEAccount[];
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
        public categories?: ICategory[]
    ) {}
}

export function findCategory(categories: ICategory[], id: string): ICategory {
    for (const i in categories) {
        let category: ICategory = categories[i];
        if (category.id === id) {
            return category;
        }
        category = findCategory(category.categories, id);
        if (category != null) {
            return category;
        }
    }
    return null;
}

export function getAllEAccounts(category: ICategory): IEAccount[] {
    const accounts: IEAccount[] = [...category.accounts];
    for (const i in category.categories) {
        accounts.push(...getAllEAccounts(category.categories[i]));
    }
    return accounts;
}
