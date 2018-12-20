import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import UserService from '@/admin/user-management/user-management.service';

import { IUserPreferences } from '@/shared/model/user-preferences.model';
import UserPreferencesService from './user-preferences.service';

const validations: any = {
    userPreferences: {}
};

@Component({
    validations
})
export default class UserPreferencesUpdate extends Vue {
    @Inject('userPreferencesService') private userPreferencesService: () => UserPreferencesService;
    public userPreferences: IUserPreferences = {};

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
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        } else {
            this.userPreferencesService()
                .create(this.userPreferences)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
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
