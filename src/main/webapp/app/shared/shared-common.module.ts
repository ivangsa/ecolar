import { NgModule } from '@angular/core';

import { EcolarSharedLibsModule, TreeViewComponent, FilterDebitCreditPipe, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [EcolarSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, FilterDebitCreditPipe, JhiAlertComponent, JhiAlertErrorComponent, TreeViewComponent],
    exports: [EcolarSharedLibsModule, FindLanguageFromKeyPipe, FilterDebitCreditPipe, JhiAlertComponent, JhiAlertErrorComponent, TreeViewComponent]
})
export class EcolarSharedCommonModule {}
