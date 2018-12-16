import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEAccount, EAccount } from 'app/shared/model/e-account.model';
import { ICategory, getAllCategories, findCategory, findEAccount } from 'app/shared/model/category.model';
import { HouseHoldService } from '../house-hold.service';
import { IHouseHold } from 'app/shared/model/house-hold.model';

@Component({
    selector: 'eco-e-account-update',
    templateUrl: './e-account-update.component.html'
})
export class EAccountUpdateComponent implements OnInit {
    houseHold: IHouseHold;
    eAccount: IEAccount;
    isSaving: boolean;

    categories: ICategory[];

    constructor(private jhiAlertService: JhiAlertService, private service: HouseHoldService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.params.subscribe(params => {
            console.log('EAccountUpdateComponent.params', params);
            this.service.find(params.houseHoldId).subscribe(res => {
                this.houseHold = res.body;
                this.categories = getAllCategories(this.houseHold.accountCategories.categories);
                if (params.accountId) {
                    this.eAccount = findEAccount(this.houseHold, params.accountId);
                } else {
                    this.eAccount = new EAccount();
                    const category = findCategory(this.categories, params.categoryId);
                    this.eAccount.categoryId = category.id;
                    this.eAccount.type = category.accountType;
                }
            });
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.eAccount.id !== undefined) {
            this.subscribeToSaveResponse(this.service.updateEAccount(this.houseHold.id, this.eAccount));
        } else {
            this.subscribeToSaveResponse(this.service.createEAccount(this.houseHold.id, this.eAccount));
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
