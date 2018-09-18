import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccountingEvent } from 'app/shared/model/accounting-event.model';

type EntityResponseType = HttpResponse<IAccountingEvent>;
type EntityArrayResponseType = HttpResponse<IAccountingEvent[]>;

@Injectable({ providedIn: 'root' })
export class AccountingEventService {
    private resourceUrl = SERVER_API_URL + 'api/accounting-events';

    constructor(private http: HttpClient) {}

    create(accountingEvent: IAccountingEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(accountingEvent);
        return this.http
            .post<IAccountingEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(accountingEvent: IAccountingEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(accountingEvent);
        return this.http
            .put<IAccountingEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IAccountingEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAccountingEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(accountingEvent: IAccountingEvent): IAccountingEvent {
        const copy: IAccountingEvent = Object.assign({}, accountingEvent, {
            eventTime: accountingEvent.eventTime != null && accountingEvent.eventTime.isValid() ? accountingEvent.eventTime.toJSON() : null,
            registrationTime:
                accountingEvent.registrationTime != null && accountingEvent.registrationTime.isValid()
                    ? accountingEvent.registrationTime.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.eventTime = res.body.eventTime != null ? moment(res.body.eventTime) : null;
        res.body.registrationTime = res.body.registrationTime != null ? moment(res.body.registrationTime) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((accountingEvent: IAccountingEvent) => {
            accountingEvent.eventTime = accountingEvent.eventTime != null ? moment(accountingEvent.eventTime) : null;
            accountingEvent.registrationTime = accountingEvent.registrationTime != null ? moment(accountingEvent.registrationTime) : null;
        });
        return res;
    }
}
