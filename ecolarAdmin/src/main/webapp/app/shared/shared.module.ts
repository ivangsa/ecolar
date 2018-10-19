import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { EcolarAdminSharedLibsModule, EcolarAdminSharedCommonModule, EcoLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [EcolarAdminSharedLibsModule, EcolarAdminSharedCommonModule],
    declarations: [EcoLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [EcoLoginModalComponent],
    exports: [EcolarAdminSharedCommonModule, EcoLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminSharedModule {}
