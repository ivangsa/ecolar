import { Component, Inject, Vue } from 'vue-property-decorator';
import { State, namespace } from 'vuex-class';
import HouseHoldService from '../service/house-hold.service';
import { HouseHoldState } from '../store/house-hold.store';

const HouseHoldStore = namespace('HouseHoldStore');

@Component
export default class HouseHoldDetails extends Vue {
    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;
    @State('HouseHoldStore') state: HouseHoldState;
    @HouseHoldStore.Mutation('selectHouseHoldById') selectHouseHoldById;

    beforeRouteEnter(to, from, next) {
        next(vm => vm.selectHouseHoldById(to.params.houseHoldId));
    }

    public previousState() {
        this.$router.go(-1);
    }
}
