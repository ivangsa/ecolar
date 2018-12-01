import { Moment } from 'moment';
import { IMovementLine } from './movement-line.model';

export interface IMovement {
    id?: string;
    eventTime?: Moment;
    registrationTime?: Moment;
    amount?: number;
    location?: string;
    eventLines?: IMovementLine[];
}

export class Movement implements IMovement {
    constructor(
        public id?: string,
        public eventTime?: Moment,
        public registrationTime?: Moment,
        public amount?: number,
        public location?: string,
        public eventLines?: IMovementLine[]
    ) {}
}
