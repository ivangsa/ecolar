import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EcolarAdminHouseHoldModule } from './house-hold/house-hold.module';
import { EcolarAdminAccountCategoriesModule } from './account-categories/account-categories.module';
//import { EcolarAdminEAccountModule } from './e-account/e-account.module';
import { EcolarAdminUserPreferencesModule } from './user-preferences/user-preferences.module';

@NgModule({
    // prettier-ignore
    imports: [
        EcolarAdminHouseHoldModule,
        EcolarAdminAccountCategoriesModule,
//        EcolarAdminEAccountModule,
        EcolarAdminUserPreferencesModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminHouseHoldsModule {}
