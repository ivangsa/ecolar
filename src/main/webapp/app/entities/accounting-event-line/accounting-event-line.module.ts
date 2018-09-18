import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import {
    AccountingEventLineComponent,
    AccountingEventLineDetailComponent,
    AccountingEventLineUpdateComponent,
    AccountingEventLineDeletePopupComponent,
    AccountingEventLineDeleteDialogComponent,
    accountingEventLineRoute,
    accountingEventLinePopupRoute
} from './';

const ENTITY_STATES = [...accountingEventLineRoute, ...accountingEventLinePopupRoute];

@NgModule({
    imports: [EcolarSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccountingEventLineComponent,
        AccountingEventLineDetailComponent,
        AccountingEventLineUpdateComponent,
        AccountingEventLineDeleteDialogComponent,
        AccountingEventLineDeletePopupComponent
    ],
    entryComponents: [
        AccountingEventLineComponent,
        AccountingEventLineUpdateComponent,
        AccountingEventLineDeleteDialogComponent,
        AccountingEventLineDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAccountingEventLineModule {}
