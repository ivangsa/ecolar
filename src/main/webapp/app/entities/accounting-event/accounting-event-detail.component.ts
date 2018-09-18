import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountingEvent, AccountingEventType, FilterDebitCredit } from 'app/shared/model/accounting-event.model';

@Component({
    selector: 'jhi-accounting-event-detail',
    templateUrl: './accounting-event-detail.component.html'
})
export class AccountingEventDetailComponent implements OnInit {
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
