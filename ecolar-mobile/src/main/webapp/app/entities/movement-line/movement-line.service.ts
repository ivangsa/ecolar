import axios from 'axios';

import { IMovementLine } from '@/shared/model/movement-line.model';

const baseApiUrl = 'api/movement-lines';

export default class MovementLineService {
    public find(id): Promise<IMovementLine> {
        return new Promise<IMovementLine>(resolve => {
            axios.get(`${baseApiUrl}/${id}`).then(function(res) {
                resolve(res.data);
            });
        });
    }

    public retrieve(paginationQuery?: any): Promise<any> {
        return new Promise<any>(resolve => {
            axios.get(baseApiUrl).then(function(res) {
                resolve(res);
            });
        });
    }

    public delete(id): Promise<any> {
        return new Promise<any>(resolve => {
            axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
                resolve(res);
            });
        });
    }

    public create(entity): Promise<IMovementLine> {
        return new Promise<IMovementLine>(resolve => {
            axios.post(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }

    public update(entity): Promise<IMovementLine> {
        return new Promise<IMovementLine>(resolve => {
            axios.put(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }
}
