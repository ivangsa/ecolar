import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserPreferences } from 'app/shared/model/user-preferences.model';
import { UserPreferencesService } from './user-preferences.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'eco-user-preferences-update',
    templateUrl: './user-preferences-update.component.html'
})
export class UserPreferencesUpdateComponent implements OnInit {
    userPreferences: IUserPreferences;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userPreferencesService: UserPreferencesService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userPreferences }) => {
            this.userPreferences = userPreferences;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userPreferences.id !== undefined) {
            this.subscribeToSaveResponse(this.userPreferencesService.update(this.userPreferences));
        } else {
            this.subscribeToSaveResponse(this.userPreferencesService.create(this.userPreferences));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserPreferences>>) {
        result.subscribe((res: HttpResponse<IUserPreferences>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
