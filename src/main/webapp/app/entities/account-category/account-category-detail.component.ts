import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountCategory } from 'app/shared/model/account-category.model';

@Component({
    selector: 'jhi-account-category-detail',
    templateUrl: './account-category-detail.component.html'
})
export class AccountCategoryDetailComponent implements OnInit {
    accountCategory: IAccountCategory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountCategory }) => {
            this.accountCategory = accountCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
