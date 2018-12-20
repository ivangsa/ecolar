import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEAccount } from '@/shared/model/e-account.model';
import EAccountService from './e-account.service';

@Component
export default class EAccountDetails extends Vue {
    @Inject('eAccountService') private eAccountService: () => EAccountService;
    public eAccount: IEAccount = {};

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.eAccountId) {
                vm.retrieveEAccount(to.params.eAccountId);
            }
        });
    }

    public retrieveEAccount(eAccountId) {
        this.eAccountService()
            .find(eAccountId)
            .then(res => {
                this.eAccount = res;
            });
    }

    public previousState() {
        this.$router.go(-1);
    }
}
