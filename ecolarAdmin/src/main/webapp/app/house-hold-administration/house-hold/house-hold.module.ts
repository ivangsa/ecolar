import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarAdminSharedModule } from 'app/shared';
import { EcolarAdminAdminModule } from 'app/admin/admin.module';
import {
    HouseHoldComponent,
    HouseHoldDetailComponent,
    HouseHoldUpdateComponent,
    HouseHoldDeletePopupComponent,
    HouseHoldDeleteDialogComponent,
    houseHoldRoute,
    houseHoldPopupRoute
} from './';

const ENTITY_STATES = [...houseHoldRoute, ...houseHoldPopupRoute];

@NgModule({
    imports: [EcolarAdminSharedModule, EcolarAdminAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HouseHoldComponent,
        HouseHoldDetailComponent,
        HouseHoldUpdateComponent,
        HouseHoldDeleteDialogComponent,
        HouseHoldDeletePopupComponent
    ],
    entryComponents: [HouseHoldComponent, HouseHoldUpdateComponent, HouseHoldDeleteDialogComponent, HouseHoldDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminHouseHoldModule {}
