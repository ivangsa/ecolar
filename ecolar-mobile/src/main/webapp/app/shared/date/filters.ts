import Vue from 'vue';
import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm';

export function initFilters() {
    Vue.filter('formatDate', function(value) {
        if (value) {
            return moment(String(value)).format(DATE_TIME_FORMAT);
        }
    });
}
