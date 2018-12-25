import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';

import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

import { HouseHoldState } from '../store/house-hold.store';
import { IMovement, Movement } from '@/shared/model/movement.model';
import { IMovementLine, LineType } from '@/shared/model/movement-line.model';
import { ICategory, AccountType } from '@/shared/model/category.model';
import { Prop } from 'vue-property-decorator';

const HouseHoldStore = namespace('HouseHoldStore');

@Component({
    name: 'account-categories-tree',
    template: `
    <div class="account-categories-tree">
        <div :style="indent" @click="toggleChildren">{{ category.name }}</div>
        <div :style="indent" @click="selectCategory(category)">Selecionar</div>
        <account-categories-tree 
            v-if="showChildren"
            v-for="category in category.categories" 
            :category="category" 
            :depth="depth + 1"
        >
        </account-categories-tree>
    </div>
    `
})
class AccountCategoriesTree extends Vue {
    @Prop() category!: ICategory;
    @Prop() depth!: number;

    showChildren: boolean = true;

    @State('HouseHoldStore') state: HouseHoldState;
    @HouseHoldStore.Mutation('selectCategory') selectCategory;

    toggleChildren() {
        this.showChildren = !this.showChildren;
    }

}

@Component({
    components: {AccountCategoriesTree}
})
export default class AddNewMovementSelectAccount extends Vue {
    @State('HouseHoldStore') state: HouseHoldState;
    @HouseHoldStore.Mutation('setSelectingAccountFor') setSelectingAccountFor;

    get categories() {
        if(this.state.selectingAccountFor === LineType.DEBIT) {
            return this.state.houseHold.accountCategories.categories
                .filter( category => category.accountType === this.state.movementType);
        } else {
            return this.state.houseHold.accountCategories.categories
                .filter( category => category.accountType === AccountType.ASSETS);
        }
    }
}