import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHouseHold } from 'app/shared/model/house-hold.model';

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
}
