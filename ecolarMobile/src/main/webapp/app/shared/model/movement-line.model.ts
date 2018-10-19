import { IEAccount } from 'app/shared/model//e-account.model';

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

export const defaultValue: Readonly<IMovementLine> = {};
