import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMovementLine } from 'app/shared/model/movement-line.model';

type EntityResponseType = HttpResponse<IMovementLine>;
type EntityArrayResponseType = HttpResponse<IMovementLine[]>;

@Injectable({ providedIn: 'root' })
export class MovementLineService {
    public resourceUrl = SERVER_API_URL + 'api/movement-lines';

    constructor(private http: HttpClient) {}

    create(movementLine: IMovementLine): Observable<EntityResponseType> {
        return this.http.post<IMovementLine>(this.resourceUrl, movementLine, { observe: 'response' });
    }

    update(movementLine: IMovementLine): Observable<EntityResponseType> {
        return this.http.put<IMovementLine>(this.resourceUrl, movementLine, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IMovementLine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMovementLine[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
