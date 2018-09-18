import { Moment } from 'moment';
import { IEventCategory } from 'app/shared/model//event-category.model';
import { IAccountingEventLine, AccountingEventLine } from 'app/shared/model//accounting-event-line.model';
import { Pipe, PipeTransform } from '@angular/core';

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

@Pipe({ name: 'filterDebitCredit' })
export class FilterDebitCredit implements PipeTransform {
    transform(items: AccountingEventLine[], eventType: AccountingEventType): AccountingEventLine[] {
        if (!items || !eventType) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.eventType === eventType);
    }
}
