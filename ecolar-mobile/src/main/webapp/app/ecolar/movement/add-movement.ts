import { Component, Inject, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

import { HouseHoldService } from "../service/house-hold.service";
import AddNewMovementSelectAccount from './add-movement-select-account.vue';
import { NewMovementState } from '../store/new-movement.store';

const validations = {
    movement: {
        eventTime: {},
        registrationTime: {},
        amount: {},
        location: {}
    }
}

const NewMovementStore = namespace('NewMovementStore')

@Component({
    mixins: [validationMixin],
    validations,
    components: { AddNewMovementSelectAccount },
})
export default class AddNewMovement extends mixins(HouseHoldService) {

    // @Inject()
    // private houseHoldService!: () => HouseHoldService;

    isSaving: boolean = false;

    @State('NewMovementStore') state: NewMovementState;
    @NewMovementStore.Mutation('initState') initState;
    @NewMovementStore.Mutation('selectMovementType') selectMovementType;

    beforeRouteEnter (to, from, next) {
        console.log('beforeRouteEnter')
        next( _this => {
            const houseHoldId = to.params.houseHoldId;
            _this.findHouseHold(houseHoldId).then(res => _this.initState(res.data))
        })
    }
    
    beforeRouteLeave (to, from, next) {
        console.log('beforeRouteLeave')
        next() // needs to be called to confirm the navigation
    }
}

