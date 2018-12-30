import Vue from 'vue';
import Vuex, { MutationTree, GetterTree } from 'vuex';
Vue.use(Vuex);

import { HouseHoldStore } from './house-hold.store';

export interface RootState {
  title?: string;
  drawer: boolean;
  showLoginForm: boolean;
  logon: boolean;
  userIdentity?: any;
  authenticated:boolean;
}

export const mutations: MutationTree<RootState> = {
  toogleDrawer(state) { 
    state.drawer = !state.drawer;
  },
  showLoginForm(state, open) {
    console.log('showLoginForm', open);
    state.showLoginForm = open;
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

export const getters: GetterTree<RootState, RootState> = {
  logon: state => state.logon,
  account: state => state.userIdentity,
  authenticated: state => state.authenticated
};

export default new Vuex.Store({
  state: {
    drawer: false,
    showLoginForm: false,
    logon: false,
    userIdentity: null,
    authenticated: false
  },
  mutations,
  getters,
  modules: {
    HouseHoldStore
  },
});