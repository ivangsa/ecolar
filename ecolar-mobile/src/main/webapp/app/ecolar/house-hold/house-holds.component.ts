import { Component, Inject, Vue } from 'vue-property-decorator';
import { IHouseHold } from '@/shared/model/house-hold.model';
import HouseHoldService from '../service/house-hold.service';
import { namespace, State } from 'vuex-class';
import { HouseHoldState } from '../store/house-hold.store';

const HouseHoldStore = namespace('HouseHoldStore');

@Component
export default class HouseHolds extends Vue {
    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;

    @State('HouseHoldStore') state: HouseHoldState;
    @HouseHoldStore.Mutation('setHouseHolds') setHouseHolds;

}
