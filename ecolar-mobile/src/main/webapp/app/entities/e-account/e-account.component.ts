import { mixins } from 'vue-class-component';
import { Component, Inject } from 'vue-property-decorator';
import Principal from '@/account/principal';
import { IEAccount } from '@/shared/model/e-account.model';

import EAccountService from './e-account.service';

@Component
export default class EAccount extends mixins(Principal) {
    @Inject('eAccountService') private eAccountService: () => EAccountService;
    private removeId: string = null;
    public eAccounts: IEAccount[] = [];

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
                this.removeId = null;
                this.retrieveAllEAccounts();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
