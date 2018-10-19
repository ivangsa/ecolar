import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserPreferences } from 'app/shared/model/user-preferences.model';

@Component({
    selector: 'eco-user-preferences-detail',
    templateUrl: './user-preferences-detail.component.html'
})
export class UserPreferencesDetailComponent implements OnInit {
    userPreferences: IUserPreferences;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userPreferences }) => {
            this.userPreferences = userPreferences;
        });
    }

    previousState() {
        window.history.back();
    }
}
