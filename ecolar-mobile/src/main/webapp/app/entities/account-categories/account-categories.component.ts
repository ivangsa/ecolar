import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IAccountCategories } from '@/shared/model/account-categories.model';
import AlertService from '@/shared/alert/alert.service';

import AccountCategoriesService from './account-categories.service';

@Component
export default class AccountCategories extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('accountCategoriesService') private accountCategoriesService: () => AccountCategoriesService;
    private removeId: string = null;
    public accountCategories: IAccountCategories[] = [];

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
        this.retrieveAllAccountCategoriess();
    }

    public clear(): void {
        this.retrieveAllAccountCategoriess();
    }

    public retrieveAllAccountCategoriess(): void {
        this.accountCategoriesService()
            .retrieve()
            .then(res => {
                this.accountCategories = res.data;
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.id;
    }

    public removeAccountCategories(): void {
        this.accountCategoriesService()
            .delete(this.removeId)
            .then(() => {
                const message = this.$t('ecolarApp.accountCategories.deleted', { param: this.removeId });
                this.alertService().showAlert(message, 'danger');
                this.getAlertFromStore();

                this.removeId = null;
                this.retrieveAllAccountCategoriess();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
