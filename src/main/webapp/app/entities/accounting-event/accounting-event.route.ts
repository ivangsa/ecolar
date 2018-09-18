import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountingEvent } from 'app/shared/model/accounting-event.model';
import { AccountingEventService } from './accounting-event.service';
import { AccountingEventComponent } from './accounting-event.component';
import { AccountingEventDetailComponent } from './accounting-event-detail.component';
import { AccountingEventUpdateComponent } from './accounting-event-update.component';
import { AccountingEventDeletePopupComponent } from './accounting-event-delete-dialog.component';
import { IAccountingEvent } from 'app/shared/model/accounting-event.model';

@Injectable({ providedIn: 'root' })
export class AccountingEventResolve implements Resolve<IAccountingEvent> {
    constructor(private service: AccountingEventService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((accountingEvent: HttpResponse<AccountingEvent>) => accountingEvent.body));
        }
        return of(new AccountingEvent());
    }
}

export const accountingEventRoute: Routes = [
    {
        path: 'accounting-event',
        component: AccountingEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounting-event/:id/view',
        component: AccountingEventDetailComponent,
        resolve: {
            accountingEvent: AccountingEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounting-event/new',
        component: AccountingEventUpdateComponent,
        resolve: {
            accountingEvent: AccountingEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounting-event/:id/edit',
        component: AccountingEventUpdateComponent,
        resolve: {
            accountingEvent: AccountingEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountingEventPopupRoute: Routes = [
    {
        path: 'accounting-event/:id/delete',
        component: AccountingEventDeletePopupComponent,
        resolve: {
            accountingEvent: AccountingEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.accountingEvent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
