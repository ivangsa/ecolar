import { mixins } from 'vue-class-component';
import { Component, Inject } from 'vue-property-decorator';
import Principal from '@/account/principal';
import { IAccountCategories } from '@/shared/model/account-categories.model';

import AccountCategoriesService from './account-categories.service';

@Component
export default class AccountCategories extends mixins(Principal) {
    @Inject('accountCategoriesService') private accountCategoriesService: () => AccountCategoriesService;
    private removeId: string;
    public accountCategories: IAccountCategories[];

    constructor() {
        super();
        this.accountCategories = [];
        this.removeId = null;
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
                this.removeId = null;
                this.retrieveAllAccountCategoriess();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
