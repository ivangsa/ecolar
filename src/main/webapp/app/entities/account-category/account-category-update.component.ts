import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAccountCategory } from 'app/shared/model/account-category.model';
import { AccountCategoryService } from './account-category.service';

@Component({
    selector: 'jhi-account-category-update',
    templateUrl: './account-category-update.component.html'
})
export class AccountCategoryUpdateComponent implements OnInit {
    private _accountCategory: IAccountCategory;
    isSaving: boolean;

    accountcategories: IAccountCategory[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private accountCategoryService: AccountCategoryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accountCategory }) => {
            this.accountCategory = accountCategory;
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
        if (this.accountCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.accountCategoryService.update(this.accountCategory));
        } else {
            this.subscribeToSaveResponse(this.accountCategoryService.create(this.accountCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccountCategory>>) {
        result.subscribe((res: HttpResponse<IAccountCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get accountCategory() {
        return this._accountCategory;
    }

    set accountCategory(accountCategory: IAccountCategory) {
        this._accountCategory = accountCategory;
    }
}
