import { NgModule } from '@angular/core';

import { EcolarSharedLibsModule, FindLanguageFromKeyPipe, EcoAlertComponent, EcoAlertErrorComponent } from './';

@NgModule({
    imports: [EcolarSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, EcoAlertComponent, EcoAlertErrorComponent],
    exports: [EcolarSharedLibsModule, FindLanguageFromKeyPipe, EcoAlertComponent, EcoAlertErrorComponent]
})
export class EcolarSharedCommonModule {}
