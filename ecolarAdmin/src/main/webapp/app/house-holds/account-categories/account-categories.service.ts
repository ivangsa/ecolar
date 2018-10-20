import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccountCategories } from 'app/shared/model/account-categories.model';

type EntityResponseType = HttpResponse<IAccountCategories>;
type EntityArrayResponseType = HttpResponse<IAccountCategories[]>;

@Injectable({ providedIn: 'root' })
export class AccountCategoriesService {
    public resourceUrl = SERVER_API_URL + 'api/account-categories';

    constructor(private http: HttpClient) {}

    create(accountCategories: IAccountCategories): Observable<EntityResponseType> {
        return this.http.post<IAccountCategories>(this.resourceUrl, accountCategories, { observe: 'response' });
    }

    update(accountCategories: IAccountCategories): Observable<EntityResponseType> {
        return this.http.put<IAccountCategories>(this.resourceUrl, accountCategories, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IAccountCategories>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAccountCategories[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
