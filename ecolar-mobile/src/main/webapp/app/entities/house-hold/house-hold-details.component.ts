import { Component, Vue, Inject } from 'vue-property-decorator';

import { IHouseHold } from '@/shared/model/house-hold.model';
import HouseHoldService from './house-hold.service';

const beforeRouteEnter = (to, from, next) => {
    next(vm => {
        if (to.params.houseHoldId) {
            vm.retrieveHouseHold(to.params.houseHoldId);
        }
    });
};

@Component({
    beforeRouteEnter
})
export default class HouseHoldDetails extends Vue {
    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;
    public houseHold: IHouseHold;

    constructor() {
        super();
        this.houseHold = {};
    }

    public retrieveHouseHold(houseHoldId) {
        this.houseHoldService()
            .find(houseHoldId)
            .then(res => {
                this.houseHold = res;
            });
    }

    public previousState() {
        this.$router.go(-1);
    }
}
