import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAccountCategories } from 'app/shared/model/account-categories.model';
import { Principal } from 'app/core';
import { AccountCategoriesService } from './account-categories.service';

@Component({
    selector: 'eco-account-categories',
    templateUrl: './account-categories.component.html'
})
export class AccountCategoriesComponent implements OnInit, OnDestroy {
    accountCategories: IAccountCategories[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accountCategoriesService: AccountCategoriesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.accountCategoriesService.query().subscribe(
            (res: HttpResponse<IAccountCategories[]>) => {
                this.accountCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAccountCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAccountCategories) {
        return item.id;
    }

    registerChangeInAccountCategories() {
        this.eventSubscriber = this.eventManager.subscribe('accountCategoriesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
