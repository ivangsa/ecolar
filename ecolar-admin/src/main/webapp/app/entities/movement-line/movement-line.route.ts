import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MovementLine } from 'app/shared/model/movement-line.model';
import { MovementLineService } from './movement-line.service';
import { MovementLineComponent } from './movement-line.component';
import { MovementLineDetailComponent } from './movement-line-detail.component';
import { MovementLineUpdateComponent } from './movement-line-update.component';
import { MovementLineDeletePopupComponent } from './movement-line-delete-dialog.component';
import { IMovementLine } from 'app/shared/model/movement-line.model';

@Injectable({ providedIn: 'root' })
export class MovementLineResolve implements Resolve<IMovementLine> {
    constructor(private service: MovementLineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovementLine> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MovementLine>) => response.ok),
                map((movementLine: HttpResponse<MovementLine>) => movementLine.body)
            );
        }
        return of(new MovementLine());
    }
}

export const movementLineRoute: Routes = [
    {
        path: 'movement-line',
        component: MovementLineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.movementLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movement-line/:id/view',
        component: MovementLineDetailComponent,
        resolve: {
            movementLine: MovementLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.movementLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movement-line/new',
        component: MovementLineUpdateComponent,
        resolve: {
            movementLine: MovementLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.movementLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movement-line/:id/edit',
        component: MovementLineUpdateComponent,
        resolve: {
            movementLine: MovementLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.movementLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movementLinePopupRoute: Routes = [
    {
        path: 'movement-line/:id/delete',
        component: MovementLineDeletePopupComponent,
        resolve: {
            movementLine: MovementLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ecolarApp.movementLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
