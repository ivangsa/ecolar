import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IMovement } from 'app/shared/model/movement.model';
import { MovementService } from './movement.service';
import { IMovementLine } from 'app/shared/model/movement-line.model';
import { MovementLineService } from 'app/entities/movement-line';

@Component({
    selector: 'eco-movement-update',
    templateUrl: './movement-update.component.html'
})
export class MovementUpdateComponent implements OnInit {
    movement: IMovement;
    isSaving: boolean;

    movementlines: IMovementLine[];
    eventTime: string;
    registrationTime: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private movementService: MovementService,
        private movementLineService: MovementLineService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ movement }) => {
            this.movement = movement;
            this.eventTime = this.movement.eventTime != null ? this.movement.eventTime.format(DATE_TIME_FORMAT) : null;
            this.registrationTime = this.movement.registrationTime != null ? this.movement.registrationTime.format(DATE_TIME_FORMAT) : null;
        });
        this.movementLineService.query().subscribe(
            (res: HttpResponse<IMovementLine[]>) => {
                this.movementlines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.movement.eventTime = this.eventTime != null ? moment(this.eventTime, DATE_TIME_FORMAT) : null;
        this.movement.registrationTime = this.registrationTime != null ? moment(this.registrationTime, DATE_TIME_FORMAT) : null;
        if (this.movement.id !== undefined) {
            this.subscribeToSaveResponse(this.movementService.update(this.movement));
        } else {
            this.subscribeToSaveResponse(this.movementService.create(this.movement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMovement>>) {
        result.subscribe((res: HttpResponse<IMovement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMovementLineById(index: number, item: IMovementLine) {
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
}
