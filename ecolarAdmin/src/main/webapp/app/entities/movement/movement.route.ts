import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movement } from 'app/shared/model/movement.model';
import { MovementService } from './movement.service';
import { MovementComponent } from './movement.component';
import { MovementDetailComponent } from './movement-detail.component';
import { MovementUpdateComponent } from './movement-update.component';
import { MovementDeletePopupComponent } from './movement-delete-dialog.component';
import { IMovement } from 'app/shared/model/movement.model';

@Injectable({ providedIn: 'root' })
export class MovementResolve implements Resolve<IMovement> {
    constructor(private service: MovementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((movement: HttpResponse<Movement>) => movement.body));
        }
        return of(new Movement());
    }
}

export const movementRoute: Routes = [
    {
        path: 'movement',
        component: MovementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.movement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movement/:id/view',
        component: MovementDetailComponent,
        resolve: {
            movement: MovementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.movement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movement/new',
        component: MovementUpdateComponent,
        resolve: {
            movement: MovementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.movement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movement/:id/edit',
        component: MovementUpdateComponent,
        resolve: {
            movement: MovementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.movement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movementPopupRoute: Routes = [
    {
        path: 'movement/:id/delete',
        component: MovementDeletePopupComponent,
        resolve: {
            movement: MovementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarAdminApp.movement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
