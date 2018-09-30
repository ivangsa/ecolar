import { IAccountsDocument } from 'app/shared/model//accounts-document.model';
import { IUser } from './user.model';

export interface IHouseHold {
  id?: string;
  name?: string;
  accountsDocument?: IAccountsDocument;
  members?: IUser[];
}

export const defaultValue: Readonly<IHouseHold> = {};
