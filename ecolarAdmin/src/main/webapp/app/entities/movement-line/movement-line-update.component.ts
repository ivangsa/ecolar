import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMovementLine } from 'app/shared/model/movement-line.model';
import { MovementLineService } from './movement-line.service';
import { IEAccount } from 'app/shared/model/e-account.model';
import { EAccountService } from 'app/house-holds/e-account';

@Component({
    selector: 'eco-movement-line-update',
    templateUrl: './movement-line-update.component.html'
})
export class MovementLineUpdateComponent implements OnInit {
    movementLine: IMovementLine;
    isSaving: boolean;

    eaccounts: IEAccount[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private movementLineService: MovementLineService,
        private eAccountService: EAccountService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ movementLine }) => {
            this.movementLine = movementLine;
        });
        this.eAccountService.query().subscribe(
            (res: HttpResponse<IEAccount[]>) => {
                this.eaccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.movementLine.id !== undefined) {
            this.subscribeToSaveResponse(this.movementLineService.update(this.movementLine));
        } else {
            this.subscribeToSaveResponse(this.movementLineService.create(this.movementLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMovementLine>>) {
        result.subscribe((res: HttpResponse<IMovementLine>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEAccountById(index: number, item: IEAccount) {
        return item.id;
    }
}
