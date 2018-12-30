import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IMovement } from '@/shared/model/movement.model';
import AlertService from '@/shared/alert/alert.service';

import MovementService from './movement.service';

@Component
export default class Movement extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('movementService') private movementService: () => MovementService;
    private removeId: string = null;
    public movements: IMovement[] = [];

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
        this.retrieveAllMovements();
    }

    public clear(): void {
        this.retrieveAllMovements();
    }

    public retrieveAllMovements(): void {
        this.movementService()
            .retrieve()
            .then(res => {
                this.movements = res.data;
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.id;
    }

    public removeMovement(): void {
        this.movementService()
            .delete(this.removeId)
            .then(() => {
                const message = this.$t('ecolarApp.movement.deleted', { param: this.removeId });
                this.alertService().showAlert(message, 'danger');
                this.getAlertFromStore();

                this.removeId = null;
                this.retrieveAllMovements();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
