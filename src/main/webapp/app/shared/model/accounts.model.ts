export interface IAccounts {
    id?: string;
    accountCode?: string;
    accountName?: string;
}

export class Accounts implements IAccounts {
    constructor(public id?: string, public accountCode?: string, public accountName?: string) {}
}
