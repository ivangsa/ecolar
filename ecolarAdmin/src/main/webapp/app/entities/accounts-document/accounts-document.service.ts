import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccountsDocument } from 'app/shared/model/accounts-document.model';

type EntityResponseType = HttpResponse<IAccountsDocument>;
type EntityArrayResponseType = HttpResponse<IAccountsDocument[]>;

@Injectable({ providedIn: 'root' })
export class AccountsDocumentService {
    private resourceUrl = SERVER_API_URL + 'api/accounts-documents';

    constructor(private http: HttpClient) {}

    create(accountsDocument: IAccountsDocument): Observable<EntityResponseType> {
        return this.http.post<IAccountsDocument>(this.resourceUrl, accountsDocument, { observe: 'response' });
    }

    update(accountsDocument: IAccountsDocument): Observable<EntityResponseType> {
        return this.http.put<IAccountsDocument>(this.resourceUrl, accountsDocument, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IAccountsDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAccountsDocument[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
