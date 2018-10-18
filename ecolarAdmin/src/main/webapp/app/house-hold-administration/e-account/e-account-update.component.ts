import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEAccount } from 'app/shared/model/e-account.model';
import { EAccountService } from './e-account.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';

@Component({
    selector: 'eco-e-account-update',
    templateUrl: './e-account-update.component.html'
})
export class EAccountUpdateComponent implements OnInit {
    eAccount: IEAccount;
    isSaving: boolean;

    categories: ICategory[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private eAccountService: EAccountService,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ eAccount }) => {
            this.eAccount = eAccount;
        });
        this.categoryService.query().subscribe(
            (res: HttpResponse<ICategory[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.eAccount.id !== undefined) {
            this.subscribeToSaveResponse(this.eAccountService.update(this.eAccount));
        } else {
            this.subscribeToSaveResponse(this.eAccountService.create(this.eAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEAccount>>) {
        result.subscribe((res: HttpResponse<IEAccount>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCategoryById(index: number, item: ICategory) {
        return item.id;
    }
}
