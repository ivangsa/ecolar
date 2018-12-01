import Vuex, { StoreOptions, MutationTree, Module } from 'vuex';

import { RootState } from './store'
import { IHouseHold, HouseHold } from '../model/house-hold.model';
import { ICategory } from '../model/category.model';
import { IEAccount } from '../model/e-account.model';
import { IMovement } from '../model/movement.model';
import { IMovementLine } from '../model/movement-line.model';

interface HouseHoldState {
  houseHold?: IHouseHold;

  currentMovement?: IMovement;
  selectedCategoryFrom?: ICategory;
  selectedCategoryTo?: ICategory;
  selectedAccountFrom?: IEAccount;
  selectedAccountTo?: IEAccount;
}

const mutations: MutationTree<HouseHoldState> = {
  selectCategoryFrom(selectedCategory) {
    this.selectedCategoryTo = selectedCategory;
  },

  selectCategoryTo(selectedCategory) {
    this.selectedCategoryTo = selectedCategory;
  },

  selectAccountFrom(selectedAccount) {
    this.selectedAccountTo = selectedAccount;
  },

  selectAccountTo(selectedAccount) {
    this.selectedAccountTo = selectedAccount;
  },
};


export const HouseHoldStore: Module<HouseHoldState, RootState> = {
  state: {},
  mutations
}