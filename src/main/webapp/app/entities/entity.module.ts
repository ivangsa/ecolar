import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EcolarAccountingEventModule } from './accounting-event/accounting-event.module';
import { EcolarAccountingEventLineModule } from './accounting-event-line/accounting-event-line.module';
import { EcolarAccountsModule } from './accounts/accounts.module';
import { EcolarEventCategoryModule } from './event-category/event-category.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EcolarAccountingEventModule,
        EcolarAccountingEventLineModule,
        EcolarAccountsModule,
        EcolarEventCategoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarEntityModule {}
