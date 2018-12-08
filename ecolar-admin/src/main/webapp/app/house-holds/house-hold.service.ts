import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHouseHold } from 'app/shared/model/house-hold.model';
import { ICategory } from 'app/shared/model/category.model';
import { IEAccount } from 'app/shared/model/e-account.model';

type EntityResponseType = HttpResponse<IHouseHold>;
type EntityArrayResponseType = HttpResponse<IHouseHold[]>;

@Injectable({ providedIn: 'root' })
export class HouseHoldService {
    public resourceUrl = SERVER_API_URL + 'api/house-holds';

    constructor(private http: HttpClient) {}

    create(houseHold: IHouseHold): Observable<EntityResponseType> {
        return this.http.post<IHouseHold>(this.resourceUrl, houseHold, { observe: 'response' });
    }

    update(houseHold: IHouseHold): Observable<EntityResponseType> {
        return this.http.put<IHouseHold>(this.resourceUrl, houseHold, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IHouseHold>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHouseHold[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getAllCategories(houseHoldId: string): Observable<EntityArrayResponseType> {
        return this.http.get<ICategory[]>(`${this.resourceUrl}/${houseHoldId}/categories`, { observe: 'response' });
    }

    findCategory(houseHoldId: string, id: string): Observable<EntityResponseType> {
        return this.http.get<ICategory>(`${this.resourceUrl}/${houseHoldId}/categories/${id}`, { observe: 'response' });
    }

    createCategory(houseHoldId: string, category: ICategory): Observable<EntityResponseType> {
        return this.http.post<IHouseHold>(`${this.resourceUrl}/${houseHoldId}/categories`, category, { observe: 'response' });
    }

    updateCategory(houseHoldId: string, category: ICategory): Observable<EntityResponseType> {
        return this.http.put<IHouseHold>(`${this.resourceUrl}/${houseHoldId}/categories`, category, { observe: 'response' });
    }

    deleteCategory(houseHoldId: string, id: string): Observable<HttpResponse<any>> {
        return this.http.delete<IHouseHold>(`${this.resourceUrl}/${houseHoldId}/categories/${id}`, { observe: 'response' });
    }

    getAllEAccounts(houseHoldId: string): Observable<EntityArrayResponseType> {
        return this.http.get<IEAccount[]>(`${this.resourceUrl}/${houseHoldId}/e-accounts`, { observe: 'response' });
    }

    findEAccount(houseHoldId: string, id: string): Observable<EntityResponseType> {
        return this.http.get<IEAccount>(`${this.resourceUrl}/${houseHoldId}/e-accounts/${id}`, { observe: 'response' });
    }

    createEAccount(houseHoldId: string, eAccount: IEAccount): Observable<EntityResponseType> {
        return this.http.post<IHouseHold>(`${this.resourceUrl}/${houseHoldId}/e-accounts`, eAccount, { observe: 'response' });
    }

    updateEAccount(houseHoldId: string, eAccount: IEAccount): Observable<EntityResponseType> {
        return this.http.put<IHouseHold>(`${this.resourceUrl}/${houseHoldId}/e-accounts`, eAccount, { observe: 'response' });
    }

    deleteEAccount(houseHoldId: string, id: string): Observable<HttpResponse<any>> {
        return this.http.delete<IHouseHold>(`${this.resourceUrl}/${houseHoldId}/e-accounts/${id}`, { observe: 'response' });
    }
}
