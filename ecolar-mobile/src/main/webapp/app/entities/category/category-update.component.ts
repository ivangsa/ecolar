import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import CategoryService from './category.service.vue';
import EAccountService from '../e-account/e-account.service.vue';
import AccountCategoriesService from '../account-categories/account-categories.service.vue';

const CategoryUpdate = {
  mixins: [CategoryService, EAccountService, CategoryService, AccountCategoriesService, CategoryService],
  data() {
    return {
      category: {
        name: null,
        description: null,
        path: null,
        parentId: null,
        accountType: null,
        eAccounts: [],
        categorys: [],
        accountCategoriess: [],
      },
      eAccounts: [],
      categorys: [],
      accountCategoriess: [],
      isSaving: false
    };
  },
  validations: {
    category: {
      name: {},
      description: {},
      path: {},
      parentId: {},
      accountType: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.categoryId) {
        vm.retrieveCategory(to.params.categoryId);
      }
      vm.initRelationships();
    });
  },
  methods: {
    save() {
      this.isSaving = true;
      if (this.category.id) {
        this.updateCategory(this.category).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      } else {
        this.createCategory(this.category).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      }
    },
    retrieveCategory(categoryId) {
      this.findCategory(categoryId).then(res => {
        this.category = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    },
    initRelationships() {
      this.retrieveEAccounts().then(res => {
        this.eAccounts = res.data;
      });
      this.retrieveCategorys().then(res => {
        this.categorys = res.data;
      });
      this.retrieveAccountCategoriess().then(res => {
        this.accountCategoriess = res.data;
      });
      this.retrieveCategorys().then(res => {
        this.categorys = res.data;
      });
    }
  }
};

export default CategoryUpdate;
