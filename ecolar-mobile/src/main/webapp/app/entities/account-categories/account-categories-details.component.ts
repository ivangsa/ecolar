import { Component, Vue, Inject } from 'vue-property-decorator';

import { IAccountCategories } from '@/shared/model/account-categories.model';
import AccountCategoriesService from './account-categories.service';

const beforeRouteEnter = (to, from, next) => {
    next(vm => {
        if (to.params.accountCategoriesId) {
            vm.retrieveAccountCategories(to.params.accountCategoriesId);
        }
    });
};

@Component({
    beforeRouteEnter
})
export default class AccountCategoriesDetails extends Vue {
    @Inject('accountCategoriesService') private accountCategoriesService: () => AccountCategoriesService;
    public accountCategories: IAccountCategories;

    constructor() {
        super();
        this.accountCategories = {};
    }

    public retrieveAccountCategories(accountCategoriesId) {
        this.accountCategoriesService()
            .find(accountCategoriesId)
            .then(res => {
                this.accountCategories = res;
            });
    }

    public previousState() {
        this.$router.go(-1);
    }
}
