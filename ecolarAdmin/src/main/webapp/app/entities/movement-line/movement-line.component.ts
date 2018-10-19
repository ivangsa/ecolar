import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMovementLine } from 'app/shared/model/movement-line.model';
import { Principal } from 'app/core';
import { MovementLineService } from './movement-line.service';

@Component({
    selector: 'eco-movement-line',
    templateUrl: './movement-line.component.html'
})
export class MovementLineComponent implements OnInit, OnDestroy {
    movementLines: IMovementLine[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private movementLineService: MovementLineService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.movementLineService.query().subscribe(
            (res: HttpResponse<IMovementLine[]>) => {
                this.movementLines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMovementLines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMovementLine) {
        return item.id;
    }

    registerChangeInMovementLines() {
        this.eventSubscriber = this.eventManager.subscribe('movementLineListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
