import { integer, required, minLength, maxLength, pattern } from 'vuelidate/lib/validators';

import AccountCategoriesService from './account-categories.service.vue';
import CategoryService from '../category/category.service.vue';
import HouseHoldService from '../house-hold/house-hold.service.vue';

const AccountCategoriesUpdate = {
  mixins: [AccountCategoriesService, CategoryService, HouseHoldService],
  data() {
    return {
      accountCategories: {
        categorys: [],
        houseHolds: []
      },
      categorys: [],
      houseHolds: [],
      isSaving: false
    };
  },
  validations: {
    accountCategories: {}
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.accountCategoriesId) {
        vm.retrieveAccountCategories(to.params.accountCategoriesId);
      }
      vm.initRelationships();
    });
  },
  methods: {
    save() {
      this.isSaving = true;
      if (this.accountCategories.id) {
        this.updateAccountCategories(this.accountCategories).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      } else {
        this.createAccountCategories(this.accountCategories).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      }
    },
    retrieveAccountCategories(accountCategoriesId) {
      this.findAccountCategories(accountCategoriesId).then(res => {
        this.accountCategories = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    },
    initRelationships() {
      this.retrieveCategorys().then(res => {
        this.categorys = res.data;
      });
      this.retrieveHouseHolds().then(res => {
        this.houseHolds = res.data;
      });
    }
  }
};

export default AccountCategoriesUpdate;
