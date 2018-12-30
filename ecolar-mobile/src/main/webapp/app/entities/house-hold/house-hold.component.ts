import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IHouseHold } from '@/shared/model/house-hold.model';
import AlertService from '@/shared/alert/alert.service';

import HouseHoldService from './house-hold.service';

@Component
export default class HouseHold extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;
    private removeId: string = null;
    public houseHolds: IHouseHold[] = [];

    public dismissCountDown: number = this.$store.getters.dismissCountDown;
    public dismissSecs: number = this.$store.getters.dismissSecs;
    public alertType: string = this.$store.getters.alertType;
    public alertMessage: any = this.$store.getters.alertMessage;

    public getAlertFromStore() {
        this.dismissCountDown = this.$store.getters.dismissCountDown;
        this.dismissSecs = this.$store.getters.dismissSecs;
        this.alertType = this.$store.getters.alertType;
        this.alertMessage = this.$store.getters.alertMessage;
    }

    public countDownChanged(dismissCountDown: number) {
        this.alertService().countDownChanged(dismissCountDown);
        this.getAlertFromStore();
    }

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
                const message = this.$t('ecolarApp.houseHold.deleted', { param: this.removeId });
                this.alertService().showAlert(message, 'danger');
                this.getAlertFromStore();

                this.removeId = null;
                this.retrieveAllHouseHolds();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
