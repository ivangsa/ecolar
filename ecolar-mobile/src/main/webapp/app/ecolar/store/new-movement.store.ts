import Vuex, { StoreOptions, MutationTree, Module } from 'vuex';

import { RootState } from '.'
import { IHouseHold, HouseHold } from '../model/house-hold.model';
import { ICategory, AccountType } from '../model/category.model';
import { IEAccount } from '../model/e-account.model';
import { IMovement } from '../model/movement.model';
import { IMovementLine, LineType } from '../model/movement-line.model';

export interface NewMovementState {
  houseHold: IHouseHold;

  movementType?:AccountType;
  selectingAccountFor?: LineType;
  currentMovement?: IMovement;
  selectedCategoryFrom?: ICategory;
  selectedCategoryTo?: ICategory;
  selectedAccountFrom?: IEAccount;
  selectedAccountTo?: IEAccount;
}

export const mutations: MutationTree<NewMovementState> = {

  initState(state: NewMovementState, houseHold: IHouseHold) {
    state.houseHold = houseHold;
  },

  selectMovementType(state: NewMovementState, movementType:AccountType) {
    state.movementType = movementType;
  },

  setSelectingAccountFor(state: NewMovementState, selectingAccountFor: LineType) {
    state.selectingAccountFor = selectingAccountFor;
  },

  selectCategory(state: NewMovementState, selectedCategory: ICategory) {
    if(state.selectingAccountFor === LineType.DEBIT) {
      state.selectedCategoryFrom = selectedCategory;
    } else if(state.selectingAccountFor === LineType.CREDIT) {
      state.selectedCategoryTo = selectedCategory;
    }
    state.selectingAccountFor = null;
  },

  selectAccount(state: NewMovementState, selectedAccount: IEAccount) {
    if(state.selectingAccountFor === LineType.DEBIT) {
      state.selectedAccountFrom = selectedAccount;
    } if(state.selectingAccountFor === LineType.CREDIT) {
      state.selectedAccountTo = selectedAccount;
    } 
  },

};


export const NewMovementStore: Module<NewMovementState, RootState> = {
  namespaced: true,
  state: {
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