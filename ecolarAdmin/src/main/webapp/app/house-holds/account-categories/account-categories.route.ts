import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountCategories } from 'app/shared/model/account-categories.model';
import { AccountCategoriesService } from './account-categories.service';
import { AccountCategoriesComponent } from './account-categories.component';
import { AccountCategoriesDetailComponent } from './account-categories-detail.component';
import { AccountCategoriesUpdateComponent } from './account-categories-update.component';
import { AccountCategoriesDeletePopupComponent } from './account-categories-delete-dialog.component';
import { IAccountCategories } from 'app/shared/model/account-categories.model';

@Injectable({ providedIn: 'root' })
export class AccountCategoriesResolve implements Resolve<IAccountCategories> {
    constructor(private service: AccountCategoriesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((accountCategories: HttpResponse<AccountCategories>) => accountCategories.body));
        }
        return of(new AccountCategories());
    }
}

export const accountCategoriesRoute: Routes = [
    {
        path: 'account-categories',
        component: AccountCategoriesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'account-categories/:id/view',
        component: AccountCategoriesDetailComponent,
        resolve: {
            accountCategories: AccountCategoriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'account-categories/new',
        component: AccountCategoriesUpdateComponent,
        resolve: {
            accountCategories: AccountCategoriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'account-categories/:id/edit',
        component: AccountCategoriesUpdateComponent,
        resolve: {
            accountCategories: AccountCategoriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountCategoriesPopupRoute: Routes = [
    {
        path: 'account-categories/:id/delete',
        component: AccountCategoriesDeletePopupComponent,
        resolve: {
            accountCategories: AccountCategoriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountCategories.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
