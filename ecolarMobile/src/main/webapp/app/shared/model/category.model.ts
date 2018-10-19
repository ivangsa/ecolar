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
  parent?: ICategory;
  document?: IAccountCategories;
  categories?: ICategory[];
}

export const defaultValue: Readonly<ICategory> = {};
