import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import EAccountService from '../e-account/e-account.service';
import { IEAccount } from '@/shared/model/e-account.model';

import AccountCategoriesService from '../account-categories/account-categories.service';
import { IAccountCategories } from '@/shared/model/account-categories.model';

import { ICategory } from '@/shared/model/category.model';
import CategoryService from './category.service';

const validations: any = {
    category: {
        name: {},
        description: {},
        path: {},
        parentId: {},
        accountType: {}
    }
};

@Component({
    validations
})
export default class CategoryUpdate extends Vue {
    @Inject('categoryService') private categoryService: () => CategoryService;
    public category: ICategory = {};

    @Inject('eAccountService') private eAccountService: () => EAccountService;
    public eAccounts: IEAccount[] = [];
    public categories: ICategory[] = [];

    @Inject('accountCategoriesService') private accountCategoriesService: () => AccountCategoriesService;
    public accountCategories: IAccountCategories[] = [];
    //public categories: ICategory[] = [];
    public isSaving: boolean = false;

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.categoryId) {
                vm.retrieveCategory(to.params.categoryId);
            }
            vm.initRelationships();
        });
    }

    public save(): void {
        this.isSaving = true;
        if (this.category.id) {
            this.categoryService()
                .update(this.category)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        } else {
            this.categoryService()
                .create(this.category)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        }
    }

    public retrieveCategory(categoryId): void {
        this.categoryService()
            .find(categoryId)
            .then(res => {
                this.category = res;
            });
    }

    public previousState(): void {
        this.$router.go(-1);
    }

    public initRelationships(): void {
        this.eAccountService()
            .retrieve()
            .then(res => {
                this.eAccounts = res.data;
            });
        this.categoryService()
            .retrieve()
            .then(res => {
                this.categories = res.data;
            });
        this.accountCategoriesService()
            .retrieve()
            .then(res => {
                this.accountCategories = res.data;
            });
        this.categoryService()
            .retrieve()
            .then(res => {
                this.categories = res.data;
            });
    }
}
