import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICategory } from 'app/shared/model/category.model';
import { HouseHoldService } from '../house-hold.service';
import { IAccountCategories } from 'app/shared/model/account-categories.model';

@Component({
    selector: 'eco-category-update',
    templateUrl: './category-update.component.html'
})
export class CategoryUpdateComponent implements OnInit {
    houseHoldId: string;
    category: ICategory;
    isSaving: boolean;

    constructor(
        private jhiAlertService: JhiAlertService,
        private categoryService: HouseHoldService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ category }) => {
            this.category = category;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.houseHoldId = this.activatedRoute.params._value['houseHoldId'];
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(this.categoryService.updateCategory(this.houseHoldId, this.category));
        } else {
            this.subscribeToSaveResponse(this.categoryService.createCategory(this.houseHoldId, this.category));
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

    trackAccountCategoriesById(index: number, item: IAccountCategories) {
        return item.id;
    }
}
