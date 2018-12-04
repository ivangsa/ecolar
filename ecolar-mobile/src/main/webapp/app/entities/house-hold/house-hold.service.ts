import Vue from 'vue';
import Component from 'vue-class-component';
import axios, {AxiosPromise} from 'axios';
import { IHouseHold } from '../../ecolar/model/house-hold.model';

const baseApiUrl = 'api/house-holds';

@Component({})
export default class HouseHoldService extends Vue {
    findHouseHold(id): AxiosPromise<IHouseHold> {
        return axios.get(`${baseApiUrl}/${id}`);
    }
    retrieveHouseHolds() {
        return axios.get(baseApiUrl);
    }
    deleteHouseHold(id) {
        return axios.delete(`${baseApiUrl}/${id}`);
    }
    createHouseHold(entity) {
        return axios.post(`${baseApiUrl}`, entity);
    }
    updateHouseHold(entity) {
        return axios.put(`${baseApiUrl}`, entity);
    }
};
