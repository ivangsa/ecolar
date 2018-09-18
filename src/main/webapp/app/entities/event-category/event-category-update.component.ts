import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEventCategory } from 'app/shared/model/event-category.model';
import { EventCategoryService } from './event-category.service';

@Component({
    selector: 'jhi-event-category-update',
    templateUrl: './event-category-update.component.html'
})
export class EventCategoryUpdateComponent implements OnInit {
    private _eventCategory: IEventCategory;
    isSaving: boolean;

    eventcategories: IEventCategory[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventCategoryService: EventCategoryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ eventCategory }) => {
            this.eventCategory = eventCategory;
        });
        this.eventCategoryService.query().subscribe(
            (res: HttpResponse<IEventCategory[]>) => {
                this.eventcategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.eventCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.eventCategoryService.update(this.eventCategory));
        } else {
            this.subscribeToSaveResponse(this.eventCategoryService.create(this.eventCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEventCategory>>) {
        result.subscribe((res: HttpResponse<IEventCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEventCategoryById(index: number, item: IEventCategory) {
        return item.id;
    }
    get eventCategory() {
        return this._eventCategory;
    }

    set eventCategory(eventCategory: IEventCategory) {
        this._eventCategory = eventCategory;
    }
}
