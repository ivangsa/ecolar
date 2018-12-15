import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IHouseHold } from 'app/shared/model/house-hold.model';
import { IAccountCategories } from 'app/shared/model/account-categories.model';
import { ICategory, Category } from 'app/shared/model/category.model';
import { AccountCategoriesComponent } from './account-categories.component';
import { CategoryUpdateComponent } from './account-categories-update.component';
import { HouseHoldService } from '../house-hold.service';

export const categoryRoute: Routes = [
    {
        path: 'house-hold/:houseHoldId/categories',
        component: AccountCategoriesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:houseHoldId/categories/new',
        component: CategoryUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:houseHoldId/categories/:categoryId',
        component: CategoryUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [];
