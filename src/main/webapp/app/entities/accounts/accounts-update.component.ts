import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAccounts } from 'app/shared/model/accounts.model';
import { AccountsService } from './accounts.service';
import { IAccountCategory } from 'app/shared/model/account-category.model';
import { AccountCategoryService } from 'app/entities/account-category';

@Component({
    selector: 'jhi-accounts-update',
    templateUrl: './accounts-update.component.html'
})
export class AccountsUpdateComponent implements OnInit {
    private _accounts: IAccounts;
    isSaving: boolean;

    accountcategories: IAccountCategory[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private accountsService: AccountsService,
        private accountCategoryService: AccountCategoryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accounts }) => {
            this.accounts = accounts;
        });
        this.accountCategoryService.query().subscribe(
            (res: HttpResponse<IAccountCategory[]>) => {
                this.accountcategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.accounts.id !== undefined) {
            this.subscribeToSaveResponse(this.accountsService.update(this.accounts));
        } else {
            this.subscribeToSaveResponse(this.accountsService.create(this.accounts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccounts>>) {
        result.subscribe((res: HttpResponse<IAccounts>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAccountCategoryById(index: number, item: IAccountCategory) {
        return item.id;
    }
    get accounts() {
        return this._accounts;
    }

    set accounts(accounts: IAccounts) {
        this._accounts = accounts;
    }
}
