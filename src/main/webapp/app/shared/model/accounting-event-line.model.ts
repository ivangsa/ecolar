import { IAccounts } from 'app/shared/model//accounts.model';

export const enum AccountingEventType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT'
}

export interface IAccountingEventLine {
    id?: string;
    amount?: number;
    eventType?: AccountingEventType;
    account?: IAccounts;
}

export class AccountingEventLine implements IAccountingEventLine {
    constructor(public id?: string, public amount?: number, public eventType?: AccountingEventType, public account?: IAccounts) {}
}
