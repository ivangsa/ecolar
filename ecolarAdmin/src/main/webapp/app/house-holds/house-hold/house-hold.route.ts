import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HouseHold } from 'app/shared/model/house-hold.model';
import { HouseHoldService } from '../house-hold.service';
import { HouseHoldComponent } from './house-hold.component';
import { HouseHoldDetailComponent } from './house-hold-detail.component';
import { HouseHoldUpdateComponent } from './house-hold-update.component';
import { HouseHoldDeletePopupComponent } from './house-hold-delete-dialog.component';
import { IHouseHold } from 'app/shared/model/house-hold.model';

@Injectable({ providedIn: 'root' })
export class HouseHoldResolve implements Resolve<IHouseHold> {
    constructor(private service: HouseHoldService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((houseHold: HttpResponse<HouseHold>) => houseHold.body));
        }
        return of(new HouseHold());
    }
}

export const houseHoldRoute: Routes = [
    {
        path: 'house-hold',
        component: HouseHoldComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.houseHold.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:id/view',
        component: HouseHoldDetailComponent,
        resolve: {
            houseHold: HouseHoldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.houseHold.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/new',
        component: HouseHoldUpdateComponent,
        resolve: {
            houseHold: HouseHoldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.houseHold.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:id/edit',
        component: HouseHoldUpdateComponent,
        resolve: {
            houseHold: HouseHoldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.houseHold.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const houseHoldPopupRoute: Routes = [
    {
        path: 'house-hold/:id/delete',
        component: HouseHoldDeletePopupComponent,
        resolve: {
            houseHold: HouseHoldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.houseHold.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
