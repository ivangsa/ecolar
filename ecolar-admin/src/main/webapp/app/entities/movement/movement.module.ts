import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import {
    MovementComponent,
    MovementDetailComponent,
    MovementUpdateComponent,
    MovementDeletePopupComponent,
    MovementDeleteDialogComponent,
    movementRoute,
    movementPopupRoute
} from './';

const ENTITY_STATES = [...movementRoute, ...movementPopupRoute];

@NgModule({
    imports: [EcolarSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovementComponent,
        MovementDetailComponent,
        MovementUpdateComponent,
        MovementDeleteDialogComponent,
        MovementDeletePopupComponent
    ],
    entryComponents: [MovementComponent, MovementUpdateComponent, MovementDeleteDialogComponent, MovementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarMovementModule {}
