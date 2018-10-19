import { IUser } from 'app/shared/model/user.model';

export interface IUserPreferences {
  id?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IUserPreferences> = {};
