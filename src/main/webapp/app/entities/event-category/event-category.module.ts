import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcolarSharedModule } from 'app/shared';
import {
    EventCategoryComponent,
    EventCategoryDetailComponent,
    EventCategoryUpdateComponent,
    EventCategoryDeletePopupComponent,
    EventCategoryDeleteDialogComponent,
    eventCategoryRoute,
    eventCategoryPopupRoute
} from './';

const ENTITY_STATES = [...eventCategoryRoute, ...eventCategoryPopupRoute];

@NgModule({
    imports: [EcolarSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EventCategoryComponent,
        EventCategoryDetailComponent,
        EventCategoryUpdateComponent,
        EventCategoryDeleteDialogComponent,
        EventCategoryDeletePopupComponent
    ],
    entryComponents: [
        EventCategoryComponent,
        EventCategoryUpdateComponent,
        EventCategoryDeleteDialogComponent,
        EventCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcolarEventCategoryModule {}
