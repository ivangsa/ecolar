import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserPreferences } from 'app/shared/model/user-preferences.model';
import { Principal } from 'app/core';
import { UserPreferencesService } from './user-preferences.service';

@Component({
    selector: 'eco-user-preferences',
    templateUrl: './user-preferences.component.html'
})
export class UserPreferencesComponent implements OnInit, OnDestroy {
    userPreferences: IUserPreferences[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userPreferencesService: UserPreferencesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.userPreferencesService.query().subscribe(
            (res: HttpResponse<IUserPreferences[]>) => {
                this.userPreferences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserPreferences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserPreferences) {
        return item.id;
    }

    registerChangeInUserPreferences() {
        this.eventSubscriber = this.eventManager.subscribe('userPreferencesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
