import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountingEvent } from 'app/shared/model/accounting-event.model';
import { AccountingEventType } from 'app/shared/model/accounting-event-line.model';

@Component({
    selector: 'jhi-accounting-event-detail',
    templateUrl: './accounting-event-detail.component.html'
})
export class AccountingEventDetailComponent implements OnInit {
    CREDIT = AccountingEventType.CREDIT;
    DEBIT = AccountingEventType.DEBIT;

    accountingEvent: IAccountingEvent;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountingEvent }) => {
            this.accountingEvent = accountingEvent;
        });
    }

    previousState() {
        window.history.back();
    }
}
