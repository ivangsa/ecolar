import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import {
    AccountCategoriesComponent,
    AccountCategoriesDetailComponent,
    AccountCategoriesUpdateComponent,
    AccountCategoriesDeletePopupComponent,
    AccountCategoriesDeleteDialogComponent,
    accountCategoriesRoute,
    accountCategoriesPopupRoute
} from './';

const ENTITY_STATES = [...accountCategoriesRoute, ...accountCategoriesPopupRoute];

@NgModule({
    imports: [EcolarSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccountCategoriesComponent,
        AccountCategoriesDetailComponent,
        AccountCategoriesUpdateComponent,
        AccountCategoriesDeleteDialogComponent,
        AccountCategoriesDeletePopupComponent
    ],
    entryComponents: [
        AccountCategoriesComponent,
        AccountCategoriesUpdateComponent,
        AccountCategoriesDeleteDialogComponent,
        AccountCategoriesDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAccountCategoriesModule {}
