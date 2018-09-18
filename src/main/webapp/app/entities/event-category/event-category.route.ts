import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventCategory } from 'app/shared/model/event-category.model';
import { EventCategoryService } from './event-category.service';
import { EventCategoryComponent } from './event-category.component';
import { EventCategoryDetailComponent } from './event-category-detail.component';
import { EventCategoryUpdateComponent } from './event-category-update.component';
import { EventCategoryDeletePopupComponent } from './event-category-delete-dialog.component';
import { IEventCategory } from 'app/shared/model/event-category.model';

@Injectable({ providedIn: 'root' })
export class EventCategoryResolve implements Resolve<IEventCategory> {
    constructor(private service: EventCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((eventCategory: HttpResponse<EventCategory>) => eventCategory.body));
        }
        return of(new EventCategory());
    }
}

export const eventCategoryRoute: Routes = [
    {
        path: 'event-category',
        component: EventCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eventCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'event-category/:id/view',
        component: EventCategoryDetailComponent,
        resolve: {
            eventCategory: EventCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eventCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'event-category/new',
        component: EventCategoryUpdateComponent,
        resolve: {
            eventCategory: EventCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eventCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'event-category/:id/edit',
        component: EventCategoryUpdateComponent,
        resolve: {
            eventCategory: EventCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eventCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventCategoryPopupRoute: Routes = [
    {
        path: 'event-category/:id/delete',
        component: EventCategoryDeletePopupComponent,
        resolve: {
            eventCategory: EventCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.eventCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
