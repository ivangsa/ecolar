import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'app/shared/model/category.model';
import { CategoryUpdateComponent } from './category-update.component';
import { CategoryDeletePopupComponent } from './category-delete-dialog.component';
import { ICategory } from 'app/shared/model/category.model';
import { HouseHoldService } from '../house-hold.service';

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
        component: CategoryUpdateComponent,
        resolve: {
            category: CategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.category.home.title'
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
            pageTitle: 'ecolarAdminApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
