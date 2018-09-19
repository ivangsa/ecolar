import { Moment } from 'moment';
import { IEventCategory } from 'app/shared/model//event-category.model';
import { IAccountingEventLine } from 'app/shared/model//accounting-event-line.model';

export const enum AccountingEventType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT'
}

export interface IAccountingEvent {
    id?: string;
    eventTime?: Moment;
    registrationTime?: Moment;
    eventType?: AccountingEventType;
    amount?: number;
    location?: string;
    mainCategory?: IEventCategory;
    eventLines?: IAccountingEventLine[];
    categories?: IEventCategory[];
}

export class AccountingEvent implements IAccountingEvent {
    constructor(
        public id?: string,
        public eventTime?: Moment,
        public registrationTime?: Moment,
        public eventType?: AccountingEventType,
        public amount?: number,
        public location?: string,
        public mainCategory?: IEventCategory,
        public eventLines?: IAccountingEventLine[],
        public categories?: IEventCategory[]
    ) {}
}
