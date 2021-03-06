import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import {
    MovementLineComponent,
    MovementLineDetailComponent,
    MovementLineUpdateComponent,
    MovementLineDeletePopupComponent,
    MovementLineDeleteDialogComponent,
    movementLineRoute,
    movementLinePopupRoute
} from './';

const ENTITY_STATES = [...movementLineRoute, ...movementLinePopupRoute];

@NgModule({
    imports: [EcolarSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovementLineComponent,
        MovementLineDetailComponent,
        MovementLineUpdateComponent,
        MovementLineDeleteDialogComponent,
        MovementLineDeletePopupComponent
    ],
    entryComponents: [
        MovementLineComponent,
        MovementLineUpdateComponent,
        MovementLineDeleteDialogComponent,
        MovementLineDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarMovementLineModule {}
