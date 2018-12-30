import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IEAccount } from '@/shared/model/e-account.model';
import AlertService from '@/shared/alert/alert.service';

import EAccountService from './e-account.service';

@Component
export default class EAccount extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('eAccountService') private eAccountService: () => EAccountService;
    private removeId: string = null;
    public eAccounts: IEAccount[] = [];

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
        this.retrieveAllEAccounts();
    }

    public clear(): void {
        this.retrieveAllEAccounts();
    }

    public retrieveAllEAccounts(): void {
        this.eAccountService()
            .retrieve()
            .then(res => {
                this.eAccounts = res.data;
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.id;
    }

    public removeEAccount(): void {
        this.eAccountService()
            .delete(this.removeId)
            .then(() => {
                const message = this.$t('ecolarApp.eAccount.deleted', { param: this.removeId });
                this.alertService().showAlert(message, 'danger');
                this.getAlertFromStore();

                this.removeId = null;
                this.retrieveAllEAccounts();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
