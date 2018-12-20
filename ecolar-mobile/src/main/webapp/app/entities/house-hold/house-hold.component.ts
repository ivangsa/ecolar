import { mixins } from 'vue-class-component';
import { Component, Inject } from 'vue-property-decorator';
import Principal from '@/account/principal';
import { IHouseHold } from '@/shared/model/house-hold.model';

import HouseHoldService from './house-hold.service';

@Component
export default class HouseHold extends mixins(Principal) {
    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;
    private removeId: string = null;
    public houseHolds: IHouseHold[] = [];

    public mounted(): void {
        this.retrieveAllHouseHolds();
    }

    public clear(): void {
        this.retrieveAllHouseHolds();
    }

    public retrieveAllHouseHolds(): void {
        this.houseHoldService()
            .retrieve()
            .then(res => {
                this.houseHolds = res.data;
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.id;
    }

    public removeHouseHold(): void {
        this.houseHoldService()
            .delete(this.removeId)
            .then(() => {
                this.removeId = null;
                this.retrieveAllHouseHolds();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
