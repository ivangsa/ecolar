import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import { AccountCategoriesComponent, AccountCategoryTreeComponent, CategoryUpdateComponent, CategoryDeleteDialogComponent, categoryRoute } from '.';

const ENTITY_STATES = [...categoryRoute];

@NgModule({
    imports: [EcolarSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AccountCategoriesComponent, AccountCategoryTreeComponent, CategoryUpdateComponent, CategoryDeleteDialogComponent],
    entryComponents: [AccountCategoriesComponent, AccountCategoryTreeComponent, CategoryUpdateComponent, CategoryDeleteDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAccountCategoriesModule {}
