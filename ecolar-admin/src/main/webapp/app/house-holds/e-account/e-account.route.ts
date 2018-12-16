import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { EAccountUpdateComponent } from './e-account-update.component';
import { EAccountComponent } from './e-account.component';

export const eAccountRoute: Routes = [
    {
        path: 'house-hold/:houseHoldId/e-account',
        component: EAccountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:houseHoldId/e-account/new',
        component: EAccountUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-hold/:houseHoldId/e-account/:accountId/edit',
        component: EAccountUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
