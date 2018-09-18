import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAccountingEventLine } from 'app/shared/model/accounting-event-line.model';
import { AccountingEventLineService } from './accounting-event-line.service';
import { IAccounts } from 'app/shared/model/accounts.model';
import { AccountsService } from 'app/entities/accounts';

@Component({
    selector: 'jhi-accounting-event-line-update',
    templateUrl: './accounting-event-line-update.component.html'
})
export class AccountingEventLineUpdateComponent implements OnInit {
    private _accountingEventLine: IAccountingEventLine;
    isSaving: boolean;

    accounts: IAccounts[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private accountingEventLineService: AccountingEventLineService,
        private accountsService: AccountsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accountingEventLine }) => {
            this.accountingEventLine = accountingEventLine;
        });
        this.accountsService.query().subscribe(
            (res: HttpResponse<IAccounts[]>) => {
                this.accounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.accountingEventLine.id !== undefined) {
            this.subscribeToSaveResponse(this.accountingEventLineService.update(this.accountingEventLine));
        } else {
            this.subscribeToSaveResponse(this.accountingEventLineService.create(this.accountingEventLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccountingEventLine>>) {
        result.subscribe((res: HttpResponse<IAccountingEventLine>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAccountsById(index: number, item: IAccounts) {
        return item.id;
    }
    get accountingEventLine() {
        return this._accountingEventLine;
    }

    set accountingEventLine(accountingEventLine: IAccountingEventLine) {
        this._accountingEventLine = accountingEventLine;
    }
}
