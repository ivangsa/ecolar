import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAccountingEvent } from 'app/shared/model/accounting-event.model';
import { Principal } from 'app/core';
import { AccountingEventService } from './accounting-event.service';

@Component({
    selector: 'jhi-accounting-event',
    templateUrl: './accounting-event.component.html'
})
export class AccountingEventComponent implements OnInit, OnDestroy {
    accountingEvents: IAccountingEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accountingEventService: AccountingEventService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.accountingEventService.query().subscribe(
            (res: HttpResponse<IAccountingEvent[]>) => {
                this.accountingEvents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAccountingEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAccountingEvent) {
        return item.id;
    }

    registerChangeInAccountingEvents() {
        this.eventSubscriber = this.eventManager.subscribe('accountingEventListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
