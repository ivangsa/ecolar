import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMovement } from 'app/shared/model/movement.model';
import { Principal } from 'app/core';
import { MovementService } from './movement.service';

@Component({
    selector: 'eco-movement',
    templateUrl: './movement.component.html'
})
export class MovementComponent implements OnInit, OnDestroy {
    movements: IMovement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private movementService: MovementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.movementService.query().subscribe(
            (res: HttpResponse<IMovement[]>) => {
                this.movements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMovements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMovement) {
        return item.id;
    }

    registerChangeInMovements() {
        this.eventSubscriber = this.eventManager.subscribe('movementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
