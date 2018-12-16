import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EcolarHouseHoldModule } from './house-hold/house-hold.module';
import { EcolarAccountCategoriesModule } from './account-categories/account-categories.module';
import { EcolarEAccountModule } from './e-account/e-account.module';
import { EcolarUserPreferencesModule } from './user-preferences/user-preferences.module';

@NgModule({
    // prettier-ignore
    imports: [
        EcolarHouseHoldModule,
        EcolarAccountCategoriesModule,
        EcolarEAccountModule,
        EcolarUserPreferencesModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarHouseHoldsModule {}
