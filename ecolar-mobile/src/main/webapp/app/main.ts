// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import router from './router';
import * as config from './shared/config/config';
import * as bootstrapVueConfig from './shared/config/config-bootstrap-vue';
import * as vuetifyConfig from './shared/config/config-vuetify';
import JhiItemCountComponent from './shared/jhi-item-count.vue';
import ActivateService from './account/activate/activate.service';
import AuditsService from './admin/audits/audits.service';
import HealthService from './admin/health/health.service';
import LoginModalService from './account/login-modal.service';
import MetricsService from './admin/metrics/metrics.service';
import RegisterService from './account/register/register.service';
import LogsService from './admin/logs/logs.service';
import Principal from './account/principal';

import '../content/scss/vendor.scss';
import AlertService from '@/shared/alert/alert.service';
import TranslationService from '@/locale/translation.service';
import UserManagementService from '@/admin/user-management/user-management.service';
import ConfigurationService from '@/admin/configuration/configuration.service';

import HouseHoldService from '@/ecolar/service/house-hold.service';
//import HouseHoldService from '@/entities/house-hold/house-hold.service';
import UserPreferencesService from '@/entities/user-preferences/user-preferences.service';
import AccountCategoriesService from '@/entities/account-categories/account-categories.service';
import CategoryService from '@/entities/category/category.service';
import MovementService from '@/entities/movement/movement.service';
import MovementLineService from '@/entities/movement-line/movement-line.service';
import EAccountService from '@/entities/e-account/e-account.service';
// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

Vue.config.productionTip = false;

const i18n = config.initI18N(Vue);
const store = config.initVueXStore(Vue);

const alertService = new AlertService(store);
const translationService = new TranslationService(store);
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
vuetifyConfig.initVuetify(Vue);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);

const activateService = new ActivateService();
const auditsService = new AuditsService();
const healthService = new HealthService();
const loginModalService = new LoginModalService();
const metricsService = new MetricsService();
const registerService = new RegisterService();
const userManagementService = new UserManagementService();
const configurationService = new ConfigurationService();
const logsService = new LogsService();

const principal = new Principal(store, translationService, i18n, router);

const houseHoldService = new HouseHoldService();
const userPreferencesService = new UserPreferencesService();
const accountCategoriesService = new AccountCategoriesService();
const categoryService = new CategoryService();
const movementService = new MovementService();
const movementLineService = new MovementLineService();
const eAccountService = new EAccountService();
// jhipster-needle-add-entity-service-to-main-declaration - JHipster will declare entities services here

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    created: function() {
        houseHoldService.retrieveHouseHolds()
            .then(res => {
                store.commit('HouseHoldStore/setHouseHolds', res.data);
            });
    },
    provide: {
        activateService: () => activateService,
        auditsService: () => auditsService,
        healthService: () => healthService,
        loginModalService: () => loginModalService,

        configurationService: () => configurationService,
        logsService: () => logsService,
        metricsService: () => metricsService,
        principal: () => principal,
        registerService: () => registerService,
        alertService: () => alertService,
        translationService: () => translationService,
        userService: () => userManagementService,

        houseHoldService: () => houseHoldService,
        userPreferencesService: () => userPreferencesService,
        accountCategoriesService: () => accountCategoriesService,
        categoryService: () => categoryService,
        movementService: () => movementService,
        movementLineService: () => movementLineService,
        eAccountService: () => eAccountService
        // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
    },
    i18n,
    store
});
