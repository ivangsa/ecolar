import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarAdminSharedModule } from 'app/shared';
import {
    AccountsDocumentComponent,
    AccountsDocumentDetailComponent,
    AccountsDocumentUpdateComponent,
    AccountsDocumentDeletePopupComponent,
    AccountsDocumentDeleteDialogComponent,
    accountsDocumentRoute,
    accountsDocumentPopupRoute
} from './';

const ENTITY_STATES = [...accountsDocumentRoute, ...accountsDocumentPopupRoute];

@NgModule({
    imports: [EcolarAdminSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccountsDocumentComponent,
        AccountsDocumentDetailComponent,
        AccountsDocumentUpdateComponent,
        AccountsDocumentDeleteDialogComponent,
        AccountsDocumentDeletePopupComponent
    ],
    entryComponents: [
        AccountsDocumentComponent,
        AccountsDocumentUpdateComponent,
        AccountsDocumentDeleteDialogComponent,
        AccountsDocumentDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminAccountsDocumentModule {}
