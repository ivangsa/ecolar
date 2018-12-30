import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IUserPreferences } from '@/shared/model/user-preferences.model';
import AlertService from '@/shared/alert/alert.service';

import UserPreferencesService from './user-preferences.service';

@Component
export default class UserPreferences extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('userPreferencesService') private userPreferencesService: () => UserPreferencesService;
    private removeId: string = null;
    public userPreferences: IUserPreferences[] = [];

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
        this.retrieveAllUserPreferencess();
    }

    public clear(): void {
        this.retrieveAllUserPreferencess();
    }

    public retrieveAllUserPreferencess(): void {
        this.userPreferencesService()
            .retrieve()
            .then(res => {
                this.userPreferences = res.data;
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.id;
    }

    public removeUserPreferences(): void {
        this.userPreferencesService()
            .delete(this.removeId)
            .then(() => {
                const message = this.$t('ecolarApp.userPreferences.deleted', { param: this.removeId });
                this.alertService().showAlert(message, 'danger');
                this.getAlertFromStore();

                this.removeId = null;
                this.retrieveAllUserPreferencess();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
