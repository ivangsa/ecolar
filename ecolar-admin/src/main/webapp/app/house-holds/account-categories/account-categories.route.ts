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
import { CategoryUpdateComponent } from './category-update.component';
import { CategoryDeletePopupComponent } from './category-delete-dialog.component';
import { HouseHoldService } from '../house-hold.service';

@Injectable({ providedIn: 'root' })
export class HouseHoldResolve implements Resolve<IHouseHold> {
    constructor(private service: HouseHoldService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const houseHoldId = route.params['houseHoldId'];
        return this.service.find(houseHoldId).pipe(
            // tap( response => console.log(response.body)),
            map((houseHold: HttpResponse<IHouseHold>) => houseHold.body),
            tap(console.log)
        );
    }
}

@Injectable({ providedIn: 'root' })
export class CategoryResolve implements Resolve<ICategory> {
    constructor(private service: HouseHoldService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const houseHoldId = route.params['houseHoldId'];
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findCategory(houseHoldId, id).pipe(map((category: HttpResponse<Category>) => category.body));
        }
        return of(new Category());
    }
}

export const categoryRoute: Routes = [
    {
        path: 'house-hold/:houseHoldId/categories',
        component: AccountCategoriesComponent,
        resolve: {
            houseHold: HouseHoldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:houseHoldId/categories/new',
        component: CategoryUpdateComponent,
        resolve: {
            category: CategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:houseHoldId/categories/:id',
        component: CategoryUpdateComponent,
        resolve: {
            category: CategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'house-hold/:houseHoldId/categories/:id/delete',
        component: CategoryDeletePopupComponent,
        resolve: {
            category: CategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
