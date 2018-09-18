import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAccountingEventLine } from 'app/shared/model/accounting-event-line.model';
import { Principal } from 'app/core';
import { AccountingEventLineService } from './accounting-event-line.service';

@Component({
    selector: 'jhi-accounting-event-line',
    templateUrl: './accounting-event-line.component.html'
})
export class AccountingEventLineComponent implements OnInit, OnDestroy {
    accountingEventLines: IAccountingEventLine[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accountingEventLineService: AccountingEventLineService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.accountingEventLineService.query().subscribe(
            (res: HttpResponse<IAccountingEventLine[]>) => {
                this.accountingEventLines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAccountingEventLines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAccountingEventLine) {
        return item.id;
    }

    registerChangeInAccountingEventLines() {
        this.eventSubscriber = this.eventManager.subscribe('accountingEventLineListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
