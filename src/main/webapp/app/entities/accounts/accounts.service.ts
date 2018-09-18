import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccounts } from 'app/shared/model/accounts.model';

type EntityResponseType = HttpResponse<IAccounts>;
type EntityArrayResponseType = HttpResponse<IAccounts[]>;

@Injectable({ providedIn: 'root' })
export class AccountsService {
    private resourceUrl = SERVER_API_URL + 'api/accounts';

    constructor(private http: HttpClient) {}

    create(accounts: IAccounts): Observable<EntityResponseType> {
        return this.http.post<IAccounts>(this.resourceUrl, accounts, { observe: 'response' });
    }

    update(accounts: IAccounts): Observable<EntityResponseType> {
        return this.http.put<IAccounts>(this.resourceUrl, accounts, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IAccounts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAccounts[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
