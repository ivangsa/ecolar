import Vuex, { StoreOptions, MutationTree, Module } from 'vuex';

import { RootState } from './root.store'
import { IHouseHold, HouseHold } from '@/shared/model/house-hold.model';
import { ICategory, AccountType } from '@/shared/model/category.model';
import { IEAccount } from '@/shared/model/e-account.model';
import { IMovement } from '@/shared/model/movement.model';
import { IMovementLine, LineType } from '@/shared/model/movement-line.model';

export interface HouseHoldState {
  houseHolds: IHouseHold[];

  houseHold?: IHouseHold;

  movementType?: AccountType;
  selectingAccountFor?: LineType;
  currentMovement?: IMovement;
  selectedCategoryFrom?: ICategory;
  selectedCategoryTo?: ICategory;
  selectedAccountFrom?: IEAccount;
  selectedAccountTo?: IEAccount;
}

export const mutations: MutationTree<HouseHoldState> = {

  setHouseHolds(state: HouseHoldState, houseHolds: IHouseHold[]) {
    state.houseHolds = houseHolds;
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

  selectMovementType(state: HouseHoldState, movementType:AccountType) {
    state.movementType = movementType;
  },

  setSelectingAccountFor(state: HouseHoldState, selectingAccountFor: LineType) {
    state.selectingAccountFor = selectingAccountFor;
  },

  selectCategory(state: HouseHoldState, selectedCategory: ICategory) {
    if(state.selectingAccountFor === LineType.DEBIT) {
      state.selectedCategoryFrom = selectedCategory;
    } else if(state.selectingAccountFor === LineType.CREDIT) {
      state.selectedCategoryTo = selectedCategory;
    }
    state.selectingAccountFor = null;
  },

  selectAccount(state: HouseHoldState, selectedAccount: IEAccount) {
    if(state.selectingAccountFor === LineType.DEBIT) {
      state.selectedAccountFrom = selectedAccount;
    } if(state.selectingAccountFor === LineType.CREDIT) {
      state.selectedAccountTo = selectedAccount;
    } 
  },

};


export const HouseHoldStore: Module<HouseHoldState, RootState> = {
  namespaced: true,
  state: {
    houseHolds: null,
    houseHold: null,
    movementType: null,
    selectingAccountFor: null,
    currentMovement: null,
    selectedCategoryFrom: null,
    selectedCategoryTo: null,
    selectedAccountFrom: null,
    selectedAccountTo: null,
  },
  mutations
}