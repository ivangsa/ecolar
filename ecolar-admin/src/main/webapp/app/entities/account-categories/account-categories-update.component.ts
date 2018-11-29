import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAccountCategories } from 'app/shared/model/account-categories.model';
import { AccountCategoriesService } from './account-categories.service';
import { IHouseHold } from 'app/shared/model/house-hold.model';
import { HouseHoldService } from 'app/entities/house-hold';

@Component({
    selector: 'eco-account-categories-update',
    templateUrl: './account-categories-update.component.html'
})
export class AccountCategoriesUpdateComponent implements OnInit {
    accountCategories: IAccountCategories;
    isSaving: boolean;

    households: IHouseHold[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private accountCategoriesService: AccountCategoriesService,
        private houseHoldService: HouseHoldService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accountCategories }) => {
            this.accountCategories = accountCategories;
        });
        this.houseHoldService.query().subscribe(
            (res: HttpResponse<IHouseHold[]>) => {
                this.households = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.accountCategories.id !== undefined) {
            this.subscribeToSaveResponse(this.accountCategoriesService.update(this.accountCategories));
        } else {
            this.subscribeToSaveResponse(this.accountCategoriesService.create(this.accountCategories));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccountCategories>>) {
        result.subscribe((res: HttpResponse<IAccountCategories>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHouseHoldById(index: number, item: IHouseHold) {
        return item.id;
    }
}
