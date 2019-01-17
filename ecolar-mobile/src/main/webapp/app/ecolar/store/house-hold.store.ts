import Vuex, { StoreOptions, MutationTree, Module, GetterTree } from 'vuex';

import { RootState } from './root.store'
import { IHouseHold, HouseHold } from '@/shared/model/house-hold.model';
import { IEAccount } from '@/shared/model/e-account.model';
import { IMovement, Movement } from '@/shared/model/movement.model';
import { IMovementLine, LineType } from '@/shared/model/movement-line.model';

export interface HouseHoldState {
  houseHolds: IHouseHold[];
  houseHold?: IHouseHold;
}

export const mutations: MutationTree<HouseHoldState> = {

  setHouseHolds(state: HouseHoldState, houseHolds: IHouseHold[]) {
    state.houseHolds = houseHolds;
    if(state.houseHolds != null && state.houseHolds.length == 1){
      state.houseHold = state.houseHolds[0];
    }
  },

  selectHouseHoldById(state: HouseHoldState, houseHoldId: string) {
    state.houseHold = null;
    for (let i = 0; i < state.houseHolds.length; i++) {
      const houseHold = state.houseHolds[i];
      if(houseHold.id === houseHoldId) {
        state.houseHold = houseHold;
      }
    }
  },

  selectHouseHold(state: HouseHoldState, houseHold: IHouseHold) {
    state.houseHold = houseHold;
  },

};

export const getters: GetterTree<HouseHoldState, RootState> = {
}

export const HouseHoldStore: Module<HouseHoldState, RootState> = {
  namespaced: true,
  state: {
    houseHolds: null,
    houseHold: null,
  },
  getters,
  mutations
}