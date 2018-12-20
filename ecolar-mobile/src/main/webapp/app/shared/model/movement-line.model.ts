import { IEAccount } from '@/shared/model//e-account.model';

export const enum LineType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT'
}

export interface IMovementLine {
    id?: string;
    amount?: number;
    eventType?: LineType;
    account?: IEAccount;
}

export class MovementLine implements IMovementLine {
    constructor(public id?: string, public amount?: number, public eventType?: LineType, public account?: IEAccount) {}
}
