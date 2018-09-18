import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import {
    AccountingEventComponent,
    AccountingEventDetailComponent,
    AccountingEventUpdateComponent,
    AccountingEventDeletePopupComponent,
    AccountingEventDeleteDialogComponent,
    accountingEventRoute,
    accountingEventPopupRoute
} from './';

const ENTITY_STATES = [...accountingEventRoute, ...accountingEventPopupRoute];

@NgModule({
    imports: [EcolarSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccountingEventComponent,
        AccountingEventDetailComponent,
        AccountingEventUpdateComponent,
        AccountingEventDeleteDialogComponent,
        AccountingEventDeletePopupComponent
    ],
    entryComponents: [
        AccountingEventComponent,
        AccountingEventUpdateComponent,
        AccountingEventDeleteDialogComponent,
        AccountingEventDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAccountingEventModule {}
