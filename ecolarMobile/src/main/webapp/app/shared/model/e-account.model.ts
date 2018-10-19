import { ICategory } from 'app/shared/model//category.model';

export const enum AccountType {
  ASSETS = 'ASSETS',
  LIABILITIES = 'LIABILITIES',
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE'
}

export interface IEAccount {
  id?: string;
  accountCode?: string;
  accountName?: string;
  type?: AccountType;
  category?: ICategory;
}

export const defaultValue: Readonly<IEAccount> = {};
