import axios, { AxiosPromise } from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class LogsService extends Vue {
    public changeLevel(log): AxiosPromise<any> {
        return axios.put('management/logs', log);
    }

    public findAll(): AxiosPromise<any> {
        return axios.get('management/logs');
    }
}
