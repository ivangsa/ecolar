import { Component, Inject, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import HouseHoldService from '../service/house-hold.service';
import { HouseHoldState } from '../store/house-hold.store';


@Component
export default class HouseHoldDetails extends Vue {
    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;
    @State('HouseHoldStore') state: HouseHoldState;

    public previousState() {
        this.$router.go(-1);
    }
}
