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
    eventTime?: Date;
    registrationTime?: Date;
    amount?: number;
    location?: string;
    eventLines?: IMovementLine[];
}

export class Movement implements IMovement {
    constructor(
        public id?: string,
        public type?: AccountType,
        public eventTime?: Date,
        public registrationTime?: Date,
        public amount?: number,
        public location?: string,
        public eventLines?: IMovementLine[]
    ) {}
}
