import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMovement } from 'app/shared/model/movement.model';

type EntityResponseType = HttpResponse<IMovement>;
type EntityArrayResponseType = HttpResponse<IMovement[]>;

@Injectable({ providedIn: 'root' })
export class MovementService {
    public resourceUrl = SERVER_API_URL + 'api/movements';

    constructor(private http: HttpClient) {}

    create(movement: IMovement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(movement);
        return this.http
            .post<IMovement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(movement: IMovement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(movement);
        return this.http
            .put<IMovement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IMovement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMovement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(movement: IMovement): IMovement {
        const copy: IMovement = Object.assign({}, movement, {
            eventTime: movement.eventTime != null && movement.eventTime.isValid() ? movement.eventTime.toJSON() : null,
            registrationTime:
                movement.registrationTime != null && movement.registrationTime.isValid() ? movement.registrationTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.eventTime = res.body.eventTime != null ? moment(res.body.eventTime) : null;
            res.body.registrationTime = res.body.registrationTime != null ? moment(res.body.registrationTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((movement: IMovement) => {
                movement.eventTime = movement.eventTime != null ? moment(movement.eventTime) : null;
                movement.registrationTime = movement.registrationTime != null ? moment(movement.registrationTime) : null;
            });
        }
        return res;
    }
}
