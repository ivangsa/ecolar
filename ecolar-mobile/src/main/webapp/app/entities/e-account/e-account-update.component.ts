import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import AlertService from '@/shared/alert/alert.service';
import { IEAccount, EAccount } from '@/shared/model/e-account.model';
import EAccountService from './e-account.service';

const validations: any = {
    eAccount: {
        accountCode: {},
        accountName: {},
        type: {}
    }
};

@Component({
    validations
})
export default class EAccountUpdate extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('eAccountService') private eAccountService: () => EAccountService;
    public eAccount: IEAccount = new EAccount();

    @Inject('categoryService') private categoryService: () => CategoryService;
    public categories: ICategory[] = [];
    public isSaving: boolean = false;

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.eAccountId) {
                vm.retrieveEAccount(to.params.eAccountId);
            }
            vm.initRelationships();
        });
    }

    public save(): void {
        this.isSaving = true;
        if (this.eAccount.id) {
            this.eAccountService()
                .update(this.eAccount)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.eAccount.updated', { param: param.id });
                    this.alertService().showAlert(message, 'info');
                });
        } else {
            this.eAccountService()
                .create(this.eAccount)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.eAccount.created', { param: param.id });
                    this.alertService().showAlert(message, 'success');
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
