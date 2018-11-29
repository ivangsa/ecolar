import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import { EcolarAdminModule } from 'app/admin/admin.module';
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
    imports: [EcolarSharedModule, EcolarAdminModule, RouterModule.forChild(ENTITY_STATES)],
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
export class EcolarUserPreferencesModule {}
