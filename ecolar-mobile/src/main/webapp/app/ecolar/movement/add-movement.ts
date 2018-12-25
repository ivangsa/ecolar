import { Component, Inject, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

import HouseHoldService from "@/ecolar/service/house-hold.service";
import AddNewMovementSelectAccount from './add-movement-select-account.vue';
import { HouseHoldState } from '../store/house-hold.store';

const validations = {
    movement: {
        eventTime: {},
        registrationTime: {},
        amount: {},
        location: {}
    }
}

const HouseHoldStore = namespace('HouseHoldStore')

@Component({
    mixins: [validationMixin],
    validations,
    components: { AddNewMovementSelectAccount },
})
export default class AddNewMovement extends mixins(HouseHoldService) {

    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;

    isSaving: boolean = false;

    @State('HouseHoldStore') state: HouseHoldState;
    @HouseHoldStore.Mutation('selectMovementType') selectMovementType;

}

