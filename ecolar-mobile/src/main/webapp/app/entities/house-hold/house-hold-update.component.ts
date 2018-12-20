import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AccountCategoriesService from '../account-categories/account-categories.service';
import { IAccountCategories } from '@/shared/model/account-categories.model';

import UserService from '@/admin/user-management/user-management.service';

import { IHouseHold } from '@/shared/model/house-hold.model';
import HouseHoldService from './house-hold.service';

const validations: any = {
    houseHold: {
        name: {}
    }
};

@Component({
    validations
})
export default class HouseHoldUpdate extends Vue {
    @Inject('houseHoldService') private houseHoldService: () => HouseHoldService;
    public houseHold: IHouseHold = {};

    @Inject('accountCategoriesService') private accountCategoriesService: () => AccountCategoriesService;
    public accountCategories: IAccountCategories[] = [];

    @Inject('userService') private userService: () => UserService;
    public users: Array<any> = [];
    public isSaving: boolean = false;

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.houseHoldId) {
                vm.retrieveHouseHold(to.params.houseHoldId);
            }
            vm.initRelationships();
        });
    }

    public save(): void {
        this.isSaving = true;
        if (this.houseHold.id) {
            this.houseHoldService()
                .update(this.houseHold)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        } else {
            this.houseHoldService()
                .create(this.houseHold)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        }
    }

    public retrieveHouseHold(houseHoldId): void {
        this.houseHoldService()
            .find(houseHoldId)
            .then(res => {
                this.houseHold = res;
            });
    }

    public previousState(): void {
        this.$router.go(-1);
    }

    public initRelationships(): void {
        this.accountCategoriesService()
            .retrieve()
            .then(res => {
                this.accountCategories = res.data;
            });
        this.userService()
            .retrieve()
            .then(res => {
                this.users = res.data;
            });
    }

    public getSelected(selectedVals, option): any {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
