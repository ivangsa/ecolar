import axios from 'axios';

import { IUserPreferences } from '@/shared/model/user-preferences.model';

const baseApiUrl = 'api/user-preferences';

export default class UserPreferencesService {
    public find(id): Promise<IUserPreferences> {
        return new Promise<IUserPreferences>(resolve => {
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

    public create(entity): Promise<IUserPreferences> {
        return new Promise<IUserPreferences>(resolve => {
            axios.post(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }

    public update(entity): Promise<IUserPreferences> {
        return new Promise<IUserPreferences>(resolve => {
            axios.put(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }
}
