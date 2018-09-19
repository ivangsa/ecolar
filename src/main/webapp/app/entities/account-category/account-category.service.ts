import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccountCategory } from 'app/shared/model/account-category.model';

type EntityResponseType = HttpResponse<IAccountCategory>;
type EntityArrayResponseType = HttpResponse<IAccountCategory[]>;

@Injectable({ providedIn: 'root' })
export class AccountCategoryService {
    private resourceUrl = SERVER_API_URL + 'api/account-categories';

    constructor(private http: HttpClient) {}

    create(accountCategory: IAccountCategory): Observable<EntityResponseType> {
        return this.http.post<IAccountCategory>(this.resourceUrl, accountCategory, { observe: 'response' });
    }

    update(accountCategory: IAccountCategory): Observable<EntityResponseType> {
        return this.http.put<IAccountCategory>(this.resourceUrl, accountCategory, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IAccountCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAccountCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
