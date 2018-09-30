import { NgModule } from '@angular/core';

import { EcolarAdminSharedLibsModule, FindLanguageFromKeyPipe, EcoAlertComponent, EcoAlertErrorComponent } from './';

@NgModule({
    imports: [EcolarAdminSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, EcoAlertComponent, EcoAlertErrorComponent],
    exports: [EcolarAdminSharedLibsModule, FindLanguageFromKeyPipe, EcoAlertComponent, EcoAlertErrorComponent]
})
export class EcolarAdminSharedCommonModule {}
