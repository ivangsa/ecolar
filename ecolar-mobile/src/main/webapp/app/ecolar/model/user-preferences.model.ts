import { IUser } from './user.model';

export interface IUserPreferences {
    id?: string;
    user?: IUser;
}

export class UserPreferences implements IUserPreferences {
    constructor(public id?: string, public user?: IUser) {}
}
