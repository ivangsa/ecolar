import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountingEventLine } from 'app/shared/model/accounting-event-line.model';
import { AccountingEventLineService } from './accounting-event-line.service';
import { AccountingEventLineComponent } from './accounting-event-line.component';
import { AccountingEventLineDetailComponent } from './accounting-event-line-detail.component';
import { AccountingEventLineUpdateComponent } from './accounting-event-line-update.component';
import { AccountingEventLineDeletePopupComponent } from './accounting-event-line-delete-dialog.component';
import { IAccountingEventLine } from 'app/shared/model/accounting-event-line.model';

@Injectable({ providedIn: 'root' })
export class AccountingEventLineResolve implements Resolve<IAccountingEventLine> {
    constructor(private service: AccountingEventLineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((accountingEventLine: HttpResponse<AccountingEventLine>) => accountingEventLine.body));
        }
        return of(new AccountingEventLine());
    }
}

export const accountingEventLineRoute: Routes = [
    {
        path: 'accounting-event-line',
        component: AccountingEventLineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEventLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounting-event-line/:id/view',
        component: AccountingEventLineDetailComponent,
        resolve: {
            accountingEventLine: AccountingEventLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEventLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounting-event-line/new',
        component: AccountingEventLineUpdateComponent,
        resolve: {
            accountingEventLine: AccountingEventLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEventLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounting-event-line/:id/edit',
        component: AccountingEventLineUpdateComponent,
        resolve: {
            accountingEventLine: AccountingEventLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEventLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountingEventLinePopupRoute: Routes = [
    {
        path: 'accounting-event-line/:id/delete',
        component: AccountingEventLineDeletePopupComponent,
        resolve: {
            accountingEventLine: AccountingEventLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEventLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
