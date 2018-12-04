import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import EAccountService from './e-account.service.vue';
import CategoryService from '../category/category.service.vue';

const EAccountUpdate = {
  mixins: [EAccountService, CategoryService],
  data() {
    return {
      eAccount: {
        accountCode: null,
        accountName: null,
        type: null,
        categorys: []
      },
      categorys: [],
      isSaving: false
    };
  },
  validations: {
    eAccount: {
      accountCode: {},
      accountName: {},
      type: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.eAccountId) {
        vm.retrieveEAccount(to.params.eAccountId);
      }
      vm.initRelationships();
    });
  },
  methods: {
    save() {
      this.isSaving = true;
      if (this.eAccount.id) {
        this.updateEAccount(this.eAccount).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      } else {
        this.createEAccount(this.eAccount).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      }
    },
    retrieveEAccount(eAccountId) {
      this.findEAccount(eAccountId).then(res => {
        this.eAccount = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    },
    initRelationships() {
      this.retrieveCategorys().then(res => {
        this.categorys = res.data;
      });
    }
  }
};

export default EAccountUpdate;
