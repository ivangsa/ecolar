import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EcolarAdminHouseHoldModule } from './house-hold/house-hold.module';
import { EcolarAdminUserPreferencesModule } from './user-preferences/user-preferences.module';
import { EcolarAdminCategoryModule } from './category/category.module';
import { EcolarAdminEAccountModule } from './e-account/e-account.module';

@NgModule({
    // prettier-ignore
    imports: [
        EcolarAdminHouseHoldModule,
        EcolarAdminUserPreferencesModule,
        EcolarAdminCategoryModule,
        EcolarAdminEAccountModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminHouseHoldAdministrationModule {}
