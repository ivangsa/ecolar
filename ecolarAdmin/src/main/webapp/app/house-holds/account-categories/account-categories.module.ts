import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarAdminSharedModule } from 'app/shared';
import { AccountCategoriesComponent, AccountCategoryTreeComponent,
     CategoryUpdateComponent, CategoryDeletePopupComponent, CategoryDeleteDialogComponent, categoryRoute, categoryPopupRoute } from '.';

const ENTITY_STATES = [...categoryRoute, ...categoryPopupRoute];

@NgModule({
    imports: [EcolarAdminSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AccountCategoriesComponent, AccountCategoryTreeComponent, CategoryUpdateComponent, CategoryDeleteDialogComponent, CategoryDeletePopupComponent],
    entryComponents: [AccountCategoriesComponent, AccountCategoryTreeComponent, CategoryUpdateComponent, CategoryDeleteDialogComponent, CategoryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminAccountCategoriesModule {}
