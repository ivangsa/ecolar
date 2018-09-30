import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEAccount } from 'app/shared/model/e-account.model';

type EntityResponseType = HttpResponse<IEAccount>;
type EntityArrayResponseType = HttpResponse<IEAccount[]>;

@Injectable({ providedIn: 'root' })
export class EAccountService {
    private resourceUrl = SERVER_API_URL + 'api/e-accounts';

    constructor(private http: HttpClient) {}

    create(eAccount: IEAccount): Observable<EntityResponseType> {
        return this.http.post<IEAccount>(this.resourceUrl, eAccount, { observe: 'response' });
    }

    update(eAccount: IEAccount): Observable<EntityResponseType> {
        return this.http.put<IEAccount>(this.resourceUrl, eAccount, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IEAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
