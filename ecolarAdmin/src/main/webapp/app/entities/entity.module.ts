import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EcolarAdminHouseHoldModule } from './house-hold/house-hold.module';
import { EcolarAdminUserPreferencesModule } from './user-preferences/user-preferences.module';
import { EcolarAdminAccountCategoriesModule } from './account-categories/account-categories.module';
import { EcolarAdminCategoryModule } from './category/category.module';
import { EcolarAdminMovementModule } from './movement/movement.module';
import { EcolarAdminMovementLineModule } from './movement-line/movement-line.module';
import { EcolarAdminEAccountModule } from './e-account/e-account.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EcolarAdminHouseHoldModule,
        EcolarAdminUserPreferencesModule,
        EcolarAdminAccountCategoriesModule,
        EcolarAdminCategoryModule,
        EcolarAdminMovementModule,
        EcolarAdminMovementLineModule,
        EcolarAdminEAccountModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminEntityModule {}
