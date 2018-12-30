// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Modal, Pagination, Progress } from 'bootstrap-vue/es/components';
import App from '@/app.vue';
import router from '@/router';
import * as config from '@/shared/config';
import JhiItemCountComponent from '@/shared/jhi-item-count.vue';
import AuditsService from '@/admin/audits/audits.service';
import HealthService from '@/admin/health/health.service';
import LoginModalService from '@/account/login-modal.service';
import MetricsService from '@/admin/metrics/metrics.service';
import RegisterService from '@/account/register/register.service';
import LogsService from '@/admin/logs/logs.service';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import TranslationService from '@/locale/translation.service';
import UserManagementService from '@/admin/user-management/user-management.service';
import ConfigurationService from '@/admin/configuration/configuration.service';

import HouseHoldService from '@/ecolar/service/house-hold.service';

// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here
import UserPreferencesService from '@/entities/user-preferences/user-preferences.service';
import AccountCategoriesService from '@/entities/account-categories/account-categories.service';
import CategoryService from '@/entities/category/category.service';
import MovementService from '@/entities/movement/movement.service';
import MovementLineService from '@/entities/movement-line/movement-line.service';
import EAccountService from '@/entities/e-account/e-account.service';

const auditsService = new AuditsService();
const healthService = new HealthService();
const loginModalService = new LoginModalService();
const metricsService = new MetricsService();
const translationService = new TranslationService();
const registerService = new RegisterService();
const userManagementService = new UserManagementService();
const configurationService = new ConfigurationService();
const logsService = new LogsService();

const houseHoldService = new HouseHoldService();
const userPreferencesService = new UserPreferencesService();
const accountCategoriesService = new AccountCategoriesService();
const categoryService = new CategoryService();
const movementService = new MovementService();
const movementLineService = new MovementLineService();
const eAccountService = new EAccountService();
// jhipster-needle-add-entity-service-to-main-declaration - JHipster will declare entities services here

Vue.config.productionTip = false;

const i18n = config.initI18N(Vue);
config.initVueApp(Vue);
const store = config.initVueXStore(Vue);
config.initBootstrapVue(Vue);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);
Vue.use(Modal);
Vue.use(Pagination);
Vue.use(Progress);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    provide: {
        auditsService: () => auditsService,
        healthService: () => healthService,
        loginModalService: () => loginModalService,

        configurationService: () => configurationService,
        logsService: () => logsService,
        metricsService: () => metricsService,
        registerService: () => registerService,
        translationService: () => translationService,
        userService: () => userManagementService,

        // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
        houseHoldService: () => houseHoldService,
        userPreferencesService: () => userPreferencesService,
        accountCategoriesService: () => accountCategoriesService,
        categoryService: () => categoryService,
        movementService: () => movementService,
        movementLineService: () => movementLineService,
        eAccountService: () => eAccountService,
    },
    i18n,
    store
});
