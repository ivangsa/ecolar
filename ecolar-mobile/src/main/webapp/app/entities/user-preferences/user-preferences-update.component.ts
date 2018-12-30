import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { IUserPreferences, UserPreferences } from '@/shared/model/user-preferences.model';
import UserPreferencesService from './user-preferences.service';

const validations: any = {
    userPreferences: {}
};

@Component({
    validations
})
export default class UserPreferencesUpdate extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('userPreferencesService') private userPreferencesService: () => UserPreferencesService;
    public userPreferences: IUserPreferences = new UserPreferences();

    @Inject('userService') private userService: () => UserService;
    public users: Array<any> = [];
    public isSaving: boolean = false;

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.userPreferencesId) {
                vm.retrieveUserPreferences(to.params.userPreferencesId);
            }
            vm.initRelationships();
        });
    }

    public save(): void {
        this.isSaving = true;
        if (this.userPreferences.id) {
            this.userPreferencesService()
                .update(this.userPreferences)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.userPreferences.updated', { param: param.id });
                    this.alertService().showAlert(message, 'info');
                });
        } else {
            this.userPreferencesService()
                .create(this.userPreferences)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.userPreferences.created', { param: param.id });
                    this.alertService().showAlert(message, 'success');
                });
        }
    }

    public retrieveUserPreferences(userPreferencesId): void {
        this.userPreferencesService()
            .find(userPreferencesId)
            .then(res => {
                this.userPreferences = res;
            });
    }

    public previousState(): void {
        this.$router.go(-1);
    }

    public initRelationships(): void {
        this.userService()
            .retrieve()
            .then(res => {
                this.users = res.data;
            });
    }
}
