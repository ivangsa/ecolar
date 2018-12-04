import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';

import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

import { NewMovementState } from '../store/new-movement.store';
import { IMovement, Movement } from '../model/movement.model';
import { IMovementLine, LineType } from '../model/movement-line.model';
import { ICategory, AccountType } from '../model/category.model';
import { Prop } from 'vue-property-decorator';

const NewMovementStore = namespace('NewMovementStore')


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

    @State('NewMovementStore') state: NewMovementState;
    @NewMovementStore.Mutation('selectCategory') selectCategory;

    toggleChildren() {
        this.showChildren = !this.showChildren;
    }

}

@Component({
    components: {AccountCategoriesTree}
})
export default class AddNewMovementSelectAccount extends Vue {
    @State('NewMovementStore') state: NewMovementState;
    @NewMovementStore.Mutation('setSelectingAccountFor') setSelectingAccountFor;

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