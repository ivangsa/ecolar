import { integer, required, minLength, maxLength, pattern } from 'vuelidate/lib/validators';

import HouseHoldService from './house-hold.service.vue';
import AccountCategoriesService from '../account-categories/account-categories.service.vue';
import UserService from '../user/user.service.vue';

const HouseHoldUpdate = {
  mixins: [HouseHoldService, AccountCategoriesService, UserService],
  data() {
    return {
      houseHold: {
        name: null,
        accountCategoriess: [],
        users: []
      },
      accountCategoriess: [],
      users: [],
      isSaving: false
    };
  },
  validations: {
    houseHold: {
      name: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.houseHoldId) {
        vm.retrieveHouseHold(to.params.houseHoldId);
      }
      vm.initRelationships();
    });
  },
  methods: {
    save() {
      this.isSaving = true;
      if (this.houseHold.id) {
        this.updateHouseHold(this.houseHold).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      } else {
        this.createHouseHold(this.houseHold).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      }
    },
    retrieveHouseHold(houseHoldId) {
      this.findHouseHold(houseHoldId).then(res => {
        this.houseHold = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    },
    initRelationships() {
      this.retrieveAccountCategoriess().then(res => {
        this.accountCategoriess = res.data;
      });
      this.retrieveUsers().then(res => {
        this.users = res.data;
      });
    },
    getSelected(selectedVals, option) {
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
};

export default HouseHoldUpdate;
