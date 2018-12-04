import Vue from 'vue';
import Component from 'vue-class-component';
import axios, {AxiosPromise} from 'axios';
import { IHouseHold } from '../model/house-hold.model';
import { ICategory } from '../model/category.model';

const baseApiUrl = 'api/house-holds';

@Component
export class HouseHoldService extends Vue {

    findHouseHold(id): AxiosPromise<IHouseHold> {
        return axios.get(`${baseApiUrl}/${id}`);
    }
    retrieveHouseHolds(): AxiosPromise<IHouseHold[]> {
        return axios.get(baseApiUrl);
    }
    deleteHouseHold(id): AxiosPromise<any> {
        return axios.delete(`${baseApiUrl}/${id}`);
    }
    createHouseHold(entity): AxiosPromise<IHouseHold> {
        return axios.post(`${baseApiUrl}`, entity);
    }
    updateHouseHold(entity): AxiosPromise<IHouseHold> {
        return axios.put(`${baseApiUrl}`, entity);
    }

    getAllCategories(houseHoldId: string): AxiosPromise<IHouseHold[]> {
        return axios.get(`${baseApiUrl}/${houseHoldId}/categories`);
    }

    findCategory(houseHoldId: string, id: string): AxiosPromise<IHouseHold> {
        return axios.get(`${baseApiUrl}/${houseHoldId}/categories/${id}`);
    }

}
