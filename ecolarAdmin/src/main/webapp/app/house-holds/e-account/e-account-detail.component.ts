import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEAccount } from 'app/shared/model/e-account.model';

@Component({
    selector: 'eco-e-account-detail',
    templateUrl: './e-account-detail.component.html'
})
export class EAccountDetailComponent implements OnInit {
    eAccount: IEAccount;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eAccount }) => {
            this.eAccount = eAccount;
        });
    }

    previousState() {
        window.history.back();
    }
}
