import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EcolarAdminAccountsDocumentModule } from './accounts-document/accounts-document.module';
import { EcolarAdminMovementModule } from './movement/movement.module';
import { EcolarAdminMovementLineModule } from './movement-line/movement-line.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EcolarAdminAccountsDocumentModule,
        EcolarAdminMovementModule,
        EcolarAdminMovementLineModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminEntityModule {}
