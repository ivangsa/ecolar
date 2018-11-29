import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EcolarHouseHoldModule } from './house-hold/house-hold.module';
import { EcolarUserPreferencesModule } from './user-preferences/user-preferences.module';
import { EcolarAccountCategoriesModule } from './account-categories/account-categories.module';
import { EcolarCategoryModule } from './category/category.module';
import { EcolarMovementModule } from './movement/movement.module';
import { EcolarMovementLineModule } from './movement-line/movement-line.module';
import { EcolarEAccountModule } from './e-account/e-account.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EcolarHouseHoldModule,
        EcolarUserPreferencesModule,
        EcolarAccountCategoriesModule,
        EcolarCategoryModule,
        EcolarMovementModule,
        EcolarMovementLineModule,
        EcolarEAccountModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarEntityModule {}
