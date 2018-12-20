import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import HouseHoldService from '../house-hold/house-hold.service';
import { IHouseHold } from '@/shared/model/house-hold.model';

import { IAccountCategories } from '@/shared/model/account-categories.model';
import AccountCategoriesService from './account-categories.service';

const validations: any = {
    accountCategories: {}
};
const beforeRouteEnter = (to, from, next) => {
    next(vm => {
        if (to.params.accountCategoriesId) {
            vm.retrieveAccountCategories(to.params.accountCategoriesId);
        }
        vm.initRelationships();
    });
};

@Component({
    validations,
    beforeRouteEnter
})
export default class AccountCategoriesUpdate extends Vue {
    @Inject('accountCategoriesService') private accountCategoriesService: () => AccountCategoriesService;
    public accountCategories: IAccountCategories;

    @Inject('categoryService') private categoryService: () => CategoryService;
    public categories: ICategory[];

    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;
    public houseHolds: IHouseHold[];
    public isSaving: boolean;

    constructor() {
        super();
        this.accountCategories = {
            categories: [],
        };
        this.categories = [];
        this.isSaving = false;
    }

    public save(): void {
        this.isSaving = true;
        if (this.accountCategories.id) {
            this.accountCategoriesService()
                .update(this.accountCategories)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        } else {
            this.accountCategoriesService()
                .create(this.accountCategories)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
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
