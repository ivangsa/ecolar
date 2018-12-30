import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import HouseHoldService from '../house-hold/house-hold.service';
import { IHouseHold } from '@/shared/model/house-hold.model';

import AlertService from '@/shared/alert/alert.service';
import { IAccountCategories, AccountCategories } from '@/shared/model/account-categories.model';
import AccountCategoriesService from './account-categories.service';

const validations: any = {
    accountCategories: {}
};

@Component({
    validations
})
export default class AccountCategoriesUpdate extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('accountCategoriesService') private accountCategoriesService: () => AccountCategoriesService;
    public accountCategories: IAccountCategories = new AccountCategories();

    @Inject('categoryService') private categoryService: () => CategoryService;
    public categories: ICategory[] = [];

    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;
    public houseHolds: IHouseHold[] = [];
    public isSaving: boolean = false;

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.accountCategoriesId) {
                vm.retrieveAccountCategories(to.params.accountCategoriesId);
            }
            vm.initRelationships();
        });
    }

    public save(): void {
        this.isSaving = true;
        if (this.accountCategories.id) {
            this.accountCategoriesService()
                .update(this.accountCategories)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.accountCategories.updated', { param: param.id });
                    this.alertService().showAlert(message, 'info');
                });
        } else {
            this.accountCategoriesService()
                .create(this.accountCategories)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.accountCategories.created', { param: param.id });
                    this.alertService().showAlert(message, 'success');
                });
        }
    }

    public retrieveAccountCategories(accountCategoriesId): void {
        this.accountCategoriesService()
            .find(accountCategoriesId)
            .then(res => {
                this.accountCategories = res;
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
        this.houseHoldService()
            .retrieve()
            .then(res => {
                this.houseHolds = res.data;
            });
    }
}
