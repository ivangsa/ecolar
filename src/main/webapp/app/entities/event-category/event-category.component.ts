import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEventCategory } from 'app/shared/model/event-category.model';
import { Principal } from 'app/core';
import { EventCategoryService } from './event-category.service';

@Component({
    selector: 'jhi-event-category',
    templateUrl: './event-category.component.html'
})
export class EventCategoryComponent implements OnInit, OnDestroy {
    eventCategories: IEventCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private eventCategoryService: EventCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.eventCategoryService.query().subscribe(
            (res: HttpResponse<IEventCategory[]>) => {
                this.eventCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEventCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEventCategory) {
        return item.id;
    }

    registerChangeInEventCategories() {
        this.eventSubscriber = this.eventManager.subscribe('eventCategoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
