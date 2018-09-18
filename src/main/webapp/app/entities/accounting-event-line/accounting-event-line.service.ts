import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccountingEventLine } from 'app/shared/model/accounting-event-line.model';

type EntityResponseType = HttpResponse<IAccountingEventLine>;
type EntityArrayResponseType = HttpResponse<IAccountingEventLine[]>;

@Injectable({ providedIn: 'root' })
export class AccountingEventLineService {
    private resourceUrl = SERVER_API_URL + 'api/accounting-event-lines';

    constructor(private http: HttpClient) {}

    create(accountingEventLine: IAccountingEventLine): Observable<EntityResponseType> {
        return this.http.post<IAccountingEventLine>(this.resourceUrl, accountingEventLine, { observe: 'response' });
    }

    update(accountingEventLine: IAccountingEventLine): Observable<EntityResponseType> {
        return this.http.put<IAccountingEventLine>(this.resourceUrl, accountingEventLine, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IAccountingEventLine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAccountingEventLine[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
