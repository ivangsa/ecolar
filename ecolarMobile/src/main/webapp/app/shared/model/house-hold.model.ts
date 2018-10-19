import { IAccountCategories } from 'app/shared/model//account-categories.model';
import { IUser } from 'app/shared/model/user.model';

export interface IHouseHold {
  id?: string;
  name?: string;
  accountCategories?: IAccountCategories;
  members?: IUser[];
}

export const defaultValue: Readonly<IHouseHold> = {};
