import { IMovementLine } from '@/shared/model/movement-line.model';
import { AccountType } from '@/shared/model/e-account.model';

export interface IMovement {
    id?: string;
    houseHoldId?: string;
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
        public houseHoldId?: string,
        public type?: AccountType,
        public eventTime?: Date,
        public registrationTime?: Date,
        public amount?: number,
        public location?: string,
        public eventLines?: IMovementLine[]
    ) {}
}
