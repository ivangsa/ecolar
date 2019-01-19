import { Component, Inject, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { required, minLength, maxLength, minValue } from 'vuelidate/lib/validators';

import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

import HouseHoldService from "@/ecolar/service/house-hold.service";
import { HouseHoldState } from '../store/house-hold.store';
import HouseHoldDetails from '../house-hold/house-hold-details.component';
import { LineType, MovementLine } from '@/shared/model/movement-line.model';
import { ICategory } from '@/shared/model/category.model';
import VuelidateVuetifyMixin from '@/shared/validation/vuelidate-vuetify.mixin';
import { IMovement, Movement } from '@/shared/model/movement.model';
import { IEAccount, AccountType } from '@/shared/model/e-account.model';
import { IHouseHold } from '@/shared/model/house-hold.model';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

const validations = {
    movement: {
        eventTime: {},
        registrationTime: {},
        amount: { required , minLength: minLength(1), minValue: minValue(0.01)},
        location: {},
        eventLines: {
            required,
            minLength: minLength(2),
            $each: {
                account: {required},
                amount: { required, minValue: minValue(0.01)}
            }            
        }
    }
}

const HouseHoldStore = namespace('HouseHoldStore')

@Component({
    mixins: [VuelidateVuetifyMixin, HouseHoldDetails],
    validations,
})
export default class AddNewMovement extends Vue {
    isSaving: boolean = false;

    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;
    @State('HouseHoldStore') state: HouseHoldState;
    @HouseHoldStore.State('houseHold') houseHold: IHouseHold;

    movement: IMovement = null;
    selectingAccountFor: LineType = null;

    beforeRouteEnter(to, from, next) {
        next(vm => vm.newMovement(new Movement()));
    }

    newMovement(movement: IMovement) {
        this.movement = movement;
        this.selectingAccountFor = null;
        if(this.movement) {
            this.movement.eventTime = new Date();
            this.movement.eventLines = [];
            this.movement.eventLines.push(new MovementLine(null, 0.00, LineType.DEBIT));
            this.movement.eventLines.push(new MovementLine(null, 0.00, LineType.CREDIT));
        }
    }

    selectMovementType(movementType: AccountType) {
        this.newMovement(new Movement());
        this.movement.type = movementType;
        this.selectingAccountFor = null;
    }

    setSelectingAccountFor(selectingAccountFor: LineType) {
        this.selectingAccountFor = selectingAccountFor;
    }

    selectAccount(selectedAccount: IEAccount) {
        if(this.selectingAccountFor === LineType.DEBIT) {
            this.movement.eventLines[0].account = selectedAccount;
        } if(this.selectingAccountFor === LineType.CREDIT) {
            this.movement.eventLines[1].account = selectedAccount;
        }
        this.selectingAccountFor = null;
    }

    get amount() {
        return this.movement.amount;
    }

    set amount(amount: number) {
        this.movement.amount = this.movement.eventLines[0].amount = this.movement.eventLines[1].amount = amount;
    }

    get eventTime() {
        if(this.movement.eventTime) {
            return format(this.movement.eventTime, DATE_TIME_LONG_FORMAT);
        }
    }

    set eventTime(time: string) {
        this.movement.eventTime = parse(time, DATE_TIME_LONG_FORMAT, this.movement.eventTime);
    }
    
    get categories() {
        if(this.state.houseHold) {
            const flatten = (categories: ICategory[]) => Array.prototype.concat.apply(
              categories, 
              categories.map(category => flatten(category.categories) || [])
            );
            const categories: ICategory[] = flatten(this.houseHold.accountCategories.categories);
            const filter = this.selectingAccountFor === LineType.DEBIT? this.movement.type : AccountType.ASSETS;
            return categories.filter( category => category.accounts.length > 0 && category.accountType === filter);
        }        
    }

    cancel() {
        this.newMovement(null);
    }

    save() {
        this.movement.eventLines[0].amount = this.movement.amount;
        this.movement.eventLines[1].amount = this.movement.amount;
        console.log("movement", this.movement);
        this.houseHoldService().createMovement(this.movement)
            .then(response => {
                console.log("saved movement", response.data);
            });
    }
}

