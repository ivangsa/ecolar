import Vue from 'vue';
import Vuex, { MutationTree, GetterTree } from 'vuex';
Vue.use(Vuex);

import { HouseHoldStore } from './house-hold.store';

export interface RootState {
  title?: string;
  drawer: boolean;
  showLoginForm: boolean;
  dismissSecs: number;
  dismissCountDown: number;
  alertType: string;
  alertMessage: any; 
  logon: boolean;
  userIdentity?: any;
  authenticated: boolean;
  currentLanguage: string;
  languages: {};
}

export const mutations: MutationTree<RootState> = {
  toogleDrawer(state) { 
    state.drawer = !state.drawer;
  },
  showLoginForm(state, open) {
    state.showLoginForm = open;
  },
  initAlert(state) {
      state.dismissSecs = 0;
      state.dismissCountDown = 0;
      state.alertType = '';
      state.alertMessage = {};
  },
  setAlertType(state, alertType) {
      state.alertType = alertType;
  },
  setAlertMessage(state, alertMessage) {
      state.dismissSecs = 5;
      state.dismissCountDown = 5;
      state.alertMessage = alertMessage;
  },
  countDownChanged(state, newCountDown) {
      state.dismissCountDown = newCountDown;
  },
  currentLanguage(state, newLanguage) {
      state.currentLanguage = newLanguage;
  },
  authenticate(state) {
      state.logon = true;
  },
  authenticated(state, identity) {
      state.userIdentity = identity;
      state.authenticated = true;
      state.logon = false;
  },
  logout(state) {
      state.userIdentity = null;
      state.authenticated = false;
      state.logon = false;
  }
};

export const getters: GetterTree<RootState, null> = {
  dismissSecs: state => state.dismissSecs,
  dismissCountDown: state => state.dismissCountDown,
  alertType: state => state.alertType,
  alertMessage: state => state.alertMessage,
  currentLanguage: state => state.currentLanguage,
  languages: state => state.languages,
  logon: state => state.logon,
  account: state => state.userIdentity,
  authenticated: state => state.authenticated
};

export default new Vuex.Store<RootState>({
  state: {
    title: null,
    drawer: false,
    showLoginForm: false,
    dismissSecs: 0,
    dismissCountDown: 0,
    alertType: '',
    alertMessage: {},
    logon: false,
    userIdentity: null,
    authenticated: false,
    currentLanguage: 'en',
    languages: {
        en: { name: 'English' },
        gl: { name: 'Galego' },
        es: { name: 'Español' }
        // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
    }
  },
  mutations,
  getters,
  modules: {
    HouseHoldStore
  },
});