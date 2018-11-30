import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EcolarMovementModule } from './movement/movement.module';
import { EcolarMovementLineModule } from './movement-line/movement-line.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EcolarMovementModule,
        EcolarMovementLineModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarEntityModule {}
