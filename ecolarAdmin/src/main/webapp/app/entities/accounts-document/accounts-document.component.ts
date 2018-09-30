import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAccountsDocument } from 'app/shared/model/accounts-document.model';
import { Principal } from 'app/core';
import { AccountsDocumentService } from './accounts-document.service';

@Component({
    selector: 'eco-accounts-document',
    templateUrl: './accounts-document.component.html'
})
export class AccountsDocumentComponent implements OnInit, OnDestroy {
    accountsDocuments: IAccountsDocument[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accountsDocumentService: AccountsDocumentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.accountsDocumentService.query().subscribe(
            (res: HttpResponse<IAccountsDocument[]>) => {
                this.accountsDocuments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAccountsDocuments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAccountsDocument) {
        return item.id;
    }

    registerChangeInAccountsDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('accountsDocumentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
