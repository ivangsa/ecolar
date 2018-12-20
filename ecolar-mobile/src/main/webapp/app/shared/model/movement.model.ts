import { Moment } from 'moment';
import { IMovementLine } from '@/shared/model//movement-line.model';

export const enum AccountType {
    ASSETS = 'ASSETS',
    LIABILITIES = 'LIABILITIES',
    REVENUE = 'REVENUE',
    EXPENSE = 'EXPENSE'
}

export interface IMovement {
    id?: string;
    type?: AccountType;
    eventTime?: Moment;
    registrationTime?: Moment;
    amount?: number;
    location?: string;
    eventLines?: IMovementLine[];
}

export class Movement implements IMovement {
    constructor(
        public id?: string,
        public type?: AccountType,
        public eventTime?: Moment,
        public registrationTime?: Moment,
        public amount?: number,
        public location?: string,
        public eventLines?: IMovementLine[]
    ) {}
}
