import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import { IEAccount } from '@/shared/model/e-account.model';
import EAccountService from './e-account.service';

const validations: any = {
    eAccount: {
        accountCode: {},
        accountName: {},
        type: {}
    }
};
const beforeRouteEnter = (to, from, next) => {
    next(vm => {
        if (to.params.eAccountId) {
            vm.retrieveEAccount(to.params.eAccountId);
        }
        vm.initRelationships();
    });
};

@Component({
    validations,
    beforeRouteEnter
})
export default class EAccountUpdate extends Vue {
    @Inject('eAccountService') private eAccountService: () => EAccountService;
    public eAccount: IEAccount;

    @Inject('categoryService') private categoryService: () => CategoryService;
    public categories: ICategory[];
    public isSaving: boolean;

    constructor() {
        super();
        this.eAccount = {
            accountCode: null,
            accountName: null,
            type: null
        };
        this.categories = [];
        this.isSaving = false;
    }

    public save(): void {
        this.isSaving = true;
        if (this.eAccount.id) {
            this.eAccountService()
                .update(this.eAccount)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        } else {
            this.eAccountService()
                .create(this.eAccount)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        }
    }

    public retrieveEAccount(eAccountId): void {
        this.eAccountService()
            .find(eAccountId)
            .then(res => {
                this.eAccount = res;
            });
    }

    public previousState(): void {
        this.$router.go(-1);
    }

    public initRelationships(): void {
        this.categoryService()
            .retrieve()
            .then(res => {
                this.categories = res.data;
            });
    }
}
