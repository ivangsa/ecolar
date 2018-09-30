import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAccountsDocument } from 'app/shared/model/accounts-document.model';
import { AccountsDocumentService } from './accounts-document.service';
import { IHouseHold } from 'app/shared/model/house-hold.model';
import { HouseHoldService } from 'app/entities/house-hold';

@Component({
    selector: 'eco-accounts-document-update',
    templateUrl: './accounts-document-update.component.html'
})
export class AccountsDocumentUpdateComponent implements OnInit {
    accountsDocument: IAccountsDocument;
    isSaving: boolean;

    households: IHouseHold[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private accountsDocumentService: AccountsDocumentService,
        private houseHoldService: HouseHoldService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accountsDocument }) => {
            this.accountsDocument = accountsDocument;
        });
        this.houseHoldService.query().subscribe(
            (res: HttpResponse<IHouseHold[]>) => {
                this.households = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.accountsDocument.id !== undefined) {
            this.subscribeToSaveResponse(this.accountsDocumentService.update(this.accountsDocument));
        } else {
            this.subscribeToSaveResponse(this.accountsDocumentService.create(this.accountsDocument));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccountsDocument>>) {
        result.subscribe((res: HttpResponse<IAccountsDocument>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHouseHoldById(index: number, item: IHouseHold) {
        return item.id;
    }
}
