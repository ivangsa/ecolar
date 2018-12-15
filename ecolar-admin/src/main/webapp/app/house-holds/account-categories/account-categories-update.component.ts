import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICategory, findCategory, Category } from 'app/shared/model/category.model';
import { HouseHoldService } from '../house-hold.service';
import { IAccountCategories } from 'app/shared/model/account-categories.model';
import { IHouseHold } from 'app/shared/model/house-hold.model';

@Component({
    selector: 'eco-category-update',
    templateUrl: './account-categories-update.component.html'
})
export class CategoryUpdateComponent implements OnInit {
    houseHold: IHouseHold;
    category: ICategory;
    categories: ICategory[];
    isSaving: boolean;

    constructor(private jhiAlertService: JhiAlertService, private service: HouseHoldService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.params.subscribe(params => {
            console.log('CategoryUpdateComponent.params', params);
            this.service.getAllCategories(params.houseHoldId).subscribe(res => (this.categories = res.body));
            this.service.find(params.houseHoldId).subscribe(res => {
                this.houseHold = res.body;
                this.category = findCategory(this.houseHold.accountCategories.categories, params.categoryId) || new Category();
            });
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(this.service.updateCategory(this.houseHold.id, this.category));
        } else {
            this.subscribeToSaveResponse(this.service.createCategory(this.houseHold.id, this.category));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategory>>) {
        result.subscribe((res: HttpResponse<ICategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
