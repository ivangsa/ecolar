import axios from 'axios';

import { IAccountCategories } from '@/shared/model/account-categories.model';

const baseApiUrl = 'api/account-categories';

export default class AccountCategoriesService {
    public find(id): Promise<IAccountCategories> {
        return new Promise<IAccountCategories>(resolve => {
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

    public create(entity): Promise<IAccountCategories> {
        return new Promise<IAccountCategories>(resolve => {
            axios.post(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }

    public update(entity): Promise<IAccountCategories> {
        return new Promise<IAccountCategories>(resolve => {
            axios.put(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }
}
