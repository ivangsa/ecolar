import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EAccount, IEAccount } from 'app/shared/model/e-account.model';
import { HouseHoldService } from '../house-hold.service';
import { EAccountComponent } from './e-account.component';
import { EAccountDetailComponent } from './e-account-detail.component';
import { EAccountUpdateComponent } from './e-account-update.component';
import { EAccountDeletePopupComponent } from './e-account-delete-dialog.component';
import { IHouseHold } from 'app/shared/model/house-hold.model';

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
export class EAccountResolve implements Resolve<IEAccount> {
    constructor(private service: HouseHoldService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const houseHoldId = route.params['houseHoldId'];
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findEAccount(houseHoldId, id).pipe(map((eAccount: HttpResponse<IEAccount>) => eAccount.body));
        }
        return of(new EAccount());
    }
}

export const eAccountRoute: Routes = [
    {
        path: 'house-hold/:houseHoldId/categories/:categoryId/e-account',
        component: EAccountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:houseHoldId/categories/:categoryId/e-account/new',
        component: EAccountUpdateComponent,
        resolve: {
            eAccount: EAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:houseHoldId/categories/:categoryId/e-account/:id/edit',
        component: EAccountUpdateComponent,
        resolve: {
            eAccount: EAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eAccountPopupRoute: Routes = [
    {
        path: 'house-hold/:houseHoldId/e-account/:id/delete',
        component: EAccountDeletePopupComponent,
        resolve: {
            eAccount: EAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
