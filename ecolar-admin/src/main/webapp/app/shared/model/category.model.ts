import { IEAccount, EAccount, AccountType } from 'app/shared/model//e-account.model';
import { ICategory } from 'app/shared/model//category.model';
import { IAccountCategories } from 'app/shared/model//account-categories.model';
import { IHouseHold } from './house-hold.model';

export { AccountType } from 'app/shared/model/e-account.model';

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

export function getAllCategories(categories: ICategory[]): ICategory[] {
    const allCategories: ICategory[] = [...categories];
    for (let i = 0; i < categories.length; i++) {
        allCategories.push(...getAllCategories(categories[i].categories));
    }
    return allCategories;
}

export function getAllEAccounts(categories: ICategory[]): IEAccount[] {
    const accounts: IEAccount[] = [];
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        console.log('Category', category, category.accounts, category.categories);
        accounts.push(...category.accounts);
        accounts.push(...getAllEAccounts(category.categories));
    }
    return accounts;
}

export function findCategory(categories: ICategory[], id: string): ICategory {
    for (let i = 0; i < categories.length; i++) {
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

export function findEAccount(houseHold: IHouseHold, id: string): ICategory {
    const allEAccounts: EAccount[] = getAllEAccounts(houseHold.accountCategories.categories);
    for (let i = 0; i < allEAccounts.length; i++) {
        const account: IEAccount = allEAccounts[i];
        if (account.id === id) {
            return account;
        }
    }
    return null;
}
