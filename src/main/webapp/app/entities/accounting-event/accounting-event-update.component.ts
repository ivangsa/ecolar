import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAccountingEvent } from 'app/shared/model/accounting-event.model';
import { AccountingEventService } from './accounting-event.service';
import { IAccountingEventLine } from 'app/shared/model/accounting-event-line.model';
import { AccountingEventLineService } from 'app/entities/accounting-event-line';

@Component({
    selector: 'jhi-accounting-event-update',
    templateUrl: './accounting-event-update.component.html'
})
export class AccountingEventUpdateComponent implements OnInit {
    private _accountingEvent: IAccountingEvent;
    isSaving: boolean;

    accountingeventlines: IAccountingEventLine[];
    eventTime: string;
    registrationTime: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private accountingEventService: AccountingEventService,
        private accountingEventLineService: AccountingEventLineService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accountingEvent }) => {
            this.accountingEvent = accountingEvent;
        });
        this.accountingEventLineService.query().subscribe(
            (res: HttpResponse<IAccountingEventLine[]>) => {
                this.accountingeventlines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.accountingEvent.eventTime = moment(this.eventTime, DATE_TIME_FORMAT);
        this.accountingEvent.registrationTime = moment(this.registrationTime, DATE_TIME_FORMAT);
        if (this.accountingEvent.id !== undefined) {
            this.subscribeToSaveResponse(this.accountingEventService.update(this.accountingEvent));
        } else {
            this.subscribeToSaveResponse(this.accountingEventService.create(this.accountingEvent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccountingEvent>>) {
        result.subscribe((res: HttpResponse<IAccountingEvent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAccountingEventLineById(index: number, item: IAccountingEventLine) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get accountingEvent() {
        return this._accountingEvent;
    }

    set accountingEvent(accountingEvent: IAccountingEvent) {
        this._accountingEvent = accountingEvent;
        this.eventTime = moment(accountingEvent.eventTime).format(DATE_TIME_FORMAT);
        this.registrationTime = moment(accountingEvent.registrationTime).format(DATE_TIME_FORMAT);
    }
}
