import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAccountCategory } from 'app/shared/model/account-category.model';
import { Principal } from 'app/core';
import { AccountCategoryService } from './account-category.service';

@Component({
    selector: 'jhi-account-category',
    templateUrl: './account-category.component.html'
})
export class AccountCategoryComponent implements OnInit, OnDestroy {
    accountCategories: IAccountCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accountCategoryService: AccountCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.accountCategoryService.query().subscribe(
            (res: HttpResponse<IAccountCategory[]>) => {
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

    trackId(index: number, item: IAccountCategory) {
        return item.id;
    }

    registerChangeInAccountCategories() {
        this.eventSubscriber = this.eventManager.subscribe('accountCategoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
