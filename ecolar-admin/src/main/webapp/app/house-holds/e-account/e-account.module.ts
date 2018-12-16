import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import { EAccountComponent, EAccountUpdateComponent, EAccountDeleteDialogComponent, eAccountRoute } from './';

const ENTITY_STATES = [...eAccountRoute];

@NgModule({
    imports: [EcolarSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [EAccountComponent, EAccountUpdateComponent, EAccountDeleteDialogComponent],
    entryComponents: [EAccountComponent, EAccountUpdateComponent, EAccountDeleteDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarEAccountModule {}
