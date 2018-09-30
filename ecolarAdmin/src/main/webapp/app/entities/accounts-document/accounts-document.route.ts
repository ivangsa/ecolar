import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountsDocument } from 'app/shared/model/accounts-document.model';
import { AccountsDocumentService } from './accounts-document.service';
import { AccountsDocumentComponent } from './accounts-document.component';
import { AccountsDocumentDetailComponent } from './accounts-document-detail.component';
import { AccountsDocumentUpdateComponent } from './accounts-document-update.component';
import { AccountsDocumentDeletePopupComponent } from './accounts-document-delete-dialog.component';
import { IAccountsDocument } from 'app/shared/model/accounts-document.model';

@Injectable({ providedIn: 'root' })
export class AccountsDocumentResolve implements Resolve<IAccountsDocument> {
    constructor(private service: AccountsDocumentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((accountsDocument: HttpResponse<AccountsDocument>) => accountsDocument.body));
        }
        return of(new AccountsDocument());
    }
}

export const accountsDocumentRoute: Routes = [
    {
        path: 'accounts-document',
        component: AccountsDocumentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountsDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts-document/:id/view',
        component: AccountsDocumentDetailComponent,
        resolve: {
            accountsDocument: AccountsDocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountsDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts-document/new',
        component: AccountsDocumentUpdateComponent,
        resolve: {
            accountsDocument: AccountsDocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountsDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts-document/:id/edit',
        component: AccountsDocumentUpdateComponent,
        resolve: {
            accountsDocument: AccountsDocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountsDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountsDocumentPopupRoute: Routes = [
    {
        path: 'accounts-document/:id/delete',
        component: AccountsDocumentDeletePopupComponent,
        resolve: {
            accountsDocument: AccountsDocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.accountsDocument.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
