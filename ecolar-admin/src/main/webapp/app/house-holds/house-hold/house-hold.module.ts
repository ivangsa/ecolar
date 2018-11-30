import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import { EcolarAdminModule } from 'app/admin/admin.module';
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
    imports: [EcolarSharedModule, EcolarAdminModule, RouterModule.forChild(ENTITY_STATES)],
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
export class EcolarHouseHoldModule {}
