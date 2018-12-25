import Vue from 'vue';
import Vuex, { MutationTree, GetterTree } from 'vuex';
Vue.use(Vuex);

import { HouseHoldStore } from './house-hold.store';

export interface RootState {
  logon: boolean;
  userIdentity?: any;
  authenticated:boolean;
}

export const mutations: MutationTree<RootState> = {
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
    logon: false,
    userIdentity: null,
    authenticated: false
  },
  mutations,
  getters,
  modules: {
    HouseHoldStore
  }
});