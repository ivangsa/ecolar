import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IMovementLine } from '@/shared/model/movement-line.model';
import AlertService from '@/shared/alert/alert.service';

import MovementLineService from './movement-line.service';

@Component
export default class MovementLine extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('movementLineService') private movementLineService: () => MovementLineService;
    private removeId: string = null;
    public movementLines: IMovementLine[] = [];

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
        this.retrieveAllMovementLines();
    }

    public clear(): void {
        this.retrieveAllMovementLines();
    }

    public retrieveAllMovementLines(): void {
        this.movementLineService()
            .retrieve()
            .then(res => {
                this.movementLines = res.data;
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.id;
    }

    public removeMovementLine(): void {
        this.movementLineService()
            .delete(this.removeId)
            .then(() => {
                const message = this.$t('ecolarApp.movementLine.deleted', { param: this.removeId });
                this.alertService().showAlert(message, 'danger');
                this.getAlertFromStore();

                this.removeId = null;
                this.retrieveAllMovementLines();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
