import { Moment } from 'moment';
import { IMovementLine } from 'app/shared/model//movement-line.model';

export const enum AccountType {
    ASSETS = 'ASSETS',
    LIABILITIES = 'LIABILITIES',
    REVENUE = 'REVENUE',
    EXPENSE = 'EXPENSE'
}

export interface IMovement {
    id?: string;
    eventTime?: Moment;
    registrationTime?: Moment;
    amount?: number;
    location?: string;
    houseHoldId?: string;
    type?: AccountType;
    movementLines?: IMovementLine[];
}

export class Movement implements IMovement {
    constructor(
        public id?: string,
        public eventTime?: Moment,
        public registrationTime?: Moment,
        public amount?: number,
        public location?: string,
        public houseHoldId?: string,
        public type?: AccountType,
        public movementLines?: IMovementLine[]
    ) {}
}
