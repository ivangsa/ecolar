import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarAdminSharedModule } from 'app/shared';
import {
    EAccountComponent,
    EAccountDetailComponent,
    EAccountUpdateComponent,
    EAccountDeletePopupComponent,
    EAccountDeleteDialogComponent,
    eAccountRoute,
    eAccountPopupRoute
} from './';

const ENTITY_STATES = [...eAccountRoute, ...eAccountPopupRoute];

@NgModule({
    imports: [EcolarAdminSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EAccountComponent,
        EAccountDetailComponent,
        EAccountUpdateComponent,
        EAccountDeleteDialogComponent,
        EAccountDeletePopupComponent
    ],
    entryComponents: [EAccountComponent, EAccountUpdateComponent, EAccountDeleteDialogComponent, EAccountDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminEAccountModule {}
