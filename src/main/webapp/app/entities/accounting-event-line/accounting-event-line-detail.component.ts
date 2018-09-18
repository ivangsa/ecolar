import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountingEventLine } from 'app/shared/model/accounting-event-line.model';

@Component({
    selector: 'jhi-accounting-event-line-detail',
    templateUrl: './accounting-event-line-detail.component.html'
})
export class AccountingEventLineDetailComponent implements OnInit {
    accountingEventLine: IAccountingEventLine;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountingEventLine }) => {
            this.accountingEventLine = accountingEventLine;
        });
    }

    previousState() {
        window.history.back();
    }
}
