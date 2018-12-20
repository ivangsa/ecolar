import { Component, Vue, Inject } from 'vue-property-decorator';

import { IUserPreferences } from '@/shared/model/user-preferences.model';
import UserPreferencesService from './user-preferences.service';

@Component
export default class UserPreferencesDetails extends Vue {
    @Inject('userPreferencesService') private userPreferencesService: () => UserPreferencesService;
    public userPreferences: IUserPreferences = {};

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.userPreferencesId) {
                vm.retrieveUserPreferences(to.params.userPreferencesId);
            }
        });
    }

    public retrieveUserPreferences(userPreferencesId) {
        this.userPreferencesService()
            .find(userPreferencesId)
            .then(res => {
                this.userPreferences = res;
            });
    }

    public previousState() {
        this.$router.go(-1);
    }
}
