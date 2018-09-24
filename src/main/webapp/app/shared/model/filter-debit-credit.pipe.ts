import { IAccountingEventLine, AccountingEventType } from 'app/shared/model//accounting-event-line.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterDebitCredit' })
export class FilterDebitCreditPipe implements PipeTransform {
    transform(items: IAccountingEventLine[], eventType: AccountingEventType): IAccountingEventLine[] {
        if (!items || !eventType) {
            return items;
        }
        // filter all DEBIT or CREDIT
        return items.filter(item => item.eventType === eventType);
    }
}
