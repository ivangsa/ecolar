import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountsDocument } from 'app/shared/model/accounts-document.model';

@Component({
    selector: 'eco-accounts-document-detail',
    templateUrl: './accounts-document-detail.component.html'
})
export class AccountsDocumentDetailComponent implements OnInit {
    accountsDocument: IAccountsDocument;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountsDocument }) => {
            this.accountsDocument = accountsDocument;
        });
    }

    previousState() {
        window.history.back();
    }
}
