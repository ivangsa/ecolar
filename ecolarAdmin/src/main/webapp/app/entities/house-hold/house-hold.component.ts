import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHouseHold } from 'app/shared/model/house-hold.model';
import { Principal } from 'app/core';
import { HouseHoldService } from './house-hold.service';

@Component({
    selector: 'eco-house-hold',
    templateUrl: './house-hold.component.html'
})
export class HouseHoldComponent implements OnInit, OnDestroy {
    houseHolds: IHouseHold[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private houseHoldService: HouseHoldService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.houseHoldService.query().subscribe(
            (res: HttpResponse<IHouseHold[]>) => {
                this.houseHolds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHouseHolds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHouseHold) {
        return item.id;
    }

    registerChangeInHouseHolds() {
        this.eventSubscriber = this.eventManager.subscribe('houseHoldListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
