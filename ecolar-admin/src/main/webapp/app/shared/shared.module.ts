import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { EcolarSharedLibsModule, EcolarSharedCommonModule, EcoLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [EcolarSharedLibsModule, EcolarSharedCommonModule],
    declarations: [EcoLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [EcoLoginModalComponent],
    exports: [EcolarSharedCommonModule, EcoLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarSharedModule {
    static forRoot() {
        return {
            ngModule: EcolarSharedModule
        };
    }
}
