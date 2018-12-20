import { mixins } from 'vue-class-component';
import { Component, Inject } from 'vue-property-decorator';
import Principal from '@/account/principal';
import { IUserPreferences } from '@/shared/model/user-preferences.model';

import UserPreferencesService from './user-preferences.service';

@Component
export default class UserPreferences extends mixins(Principal) {
    @Inject('userPreferencesService') private userPreferencesService: () => UserPreferencesService;
    private removeId: string;
    public userPreferences: IUserPreferences[];

    constructor() {
        super();
        this.userPreferences = [];
        this.removeId = null;
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
                this.removeId = null;
                this.retrieveAllUserPreferencess();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
