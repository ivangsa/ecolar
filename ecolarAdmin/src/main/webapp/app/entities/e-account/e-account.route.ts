import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EAccount } from 'app/shared/model/e-account.model';
import { EAccountService } from './e-account.service';
import { EAccountComponent } from './e-account.component';
import { EAccountDetailComponent } from './e-account-detail.component';
import { EAccountUpdateComponent } from './e-account-update.component';
import { EAccountDeletePopupComponent } from './e-account-delete-dialog.component';
import { IEAccount } from 'app/shared/model/e-account.model';

@Injectable({ providedIn: 'root' })
export class EAccountResolve implements Resolve<IEAccount> {
    constructor(private service: EAccountService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((eAccount: HttpResponse<EAccount>) => eAccount.body));
        }
        return of(new EAccount());
    }
}

export const eAccountRoute: Routes = [
    {
        path: 'e-account',
        component: EAccountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'e-account/:id/view',
        component: EAccountDetailComponent,
        resolve: {
            eAccount: EAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'e-account/new',
        component: EAccountUpdateComponent,
        resolve: {
            eAccount: EAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'e-account/:id/edit',
        component: EAccountUpdateComponent,
        resolve: {
            eAccount: EAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eAccountPopupRoute: Routes = [
    {
        path: 'e-account/:id/delete',
        component: EAccountDeletePopupComponent,
        resolve: {
            eAccount: EAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
