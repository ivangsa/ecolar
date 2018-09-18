import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccounts } from 'app/shared/model/accounts.model';

@Component({
    selector: 'jhi-accounts-detail',
    templateUrl: './accounts-detail.component.html'
})
export class AccountsDetailComponent implements OnInit {
    accounts: IAccounts;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accounts }) => {
            this.accounts = accounts;
        });
    }

    previousState() {
        window.history.back();
    }
}
