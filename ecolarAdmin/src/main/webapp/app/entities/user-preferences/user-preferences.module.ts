import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarAdminSharedModule } from 'app/shared';
import { EcolarAdminAdminModule } from 'app/admin/admin.module';
import {
    UserPreferencesComponent,
    UserPreferencesDetailComponent,
    UserPreferencesUpdateComponent,
    UserPreferencesDeletePopupComponent,
    UserPreferencesDeleteDialogComponent,
    userPreferencesRoute,
    userPreferencesPopupRoute
} from './';

const ENTITY_STATES = [...userPreferencesRoute, ...userPreferencesPopupRoute];

@NgModule({
    imports: [EcolarAdminSharedModule, EcolarAdminAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserPreferencesComponent,
        UserPreferencesDetailComponent,
        UserPreferencesUpdateComponent,
        UserPreferencesDeleteDialogComponent,
        UserPreferencesDeletePopupComponent
    ],
    entryComponents: [
        UserPreferencesComponent,
        UserPreferencesUpdateComponent,
        UserPreferencesDeleteDialogComponent,
        UserPreferencesDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarAdminUserPreferencesModule {}
