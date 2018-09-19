import { NgModule } from '@angular/core';

import { EcolarSharedLibsModule, FilterDebitCreditPipe, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [EcolarSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, FilterDebitCreditPipe, JhiAlertComponent, JhiAlertErrorComponent],
    exports: [EcolarSharedLibsModule, FindLanguageFromKeyPipe, FilterDebitCreditPipe, JhiAlertComponent, JhiAlertErrorComponent]
})
export class EcolarSharedCommonModule {}
