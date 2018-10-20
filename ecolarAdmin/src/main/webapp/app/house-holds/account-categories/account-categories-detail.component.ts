import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountCategories } from 'app/shared/model/account-categories.model';

@Component({
    selector: 'eco-account-categories-detail',
    templateUrl: './account-categories-detail.component.html'
})
export class AccountCategoriesDetailComponent implements OnInit {
    accountCategories: IAccountCategories;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountCategories }) => {
            this.accountCategories = accountCategories;
        });
    }

    previousState() {
        window.history.back();
    }
}
