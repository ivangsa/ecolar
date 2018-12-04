import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import Vue from 'vue';
import { mapState } from 'vuex';
import Component, { mixins } from 'vue-class-component';
import HouseHoldService from './house-hold.service';
import AccountCategoriesService from '../account-categories/account-categories.service.vue';
import UserService from '../user/user.service.vue';

const HouseHoldUpdate = {
  mixins: [HouseHoldService, AccountCategoriesService, UserService],
  data() {
    return {
      accountCategories: [],
      users: [],
      isSaving: false
    };
  },
  computed: mapState<{HouseHoldStore}>({
    houseHold: (state) => state.HouseHoldStore.houseHold,
  }),
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
        this.$store.commit('load', res.data);
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

// const beforeRouteEnter = function(to, from, next) {
//   next(vm => {
//     if (to.params.houseHoldId) {
//       vm.retrieveHouseHold(to.params.houseHoldId);
//       vm.initRelationships();
//     }
//   });
// }

// const validations = {
//   houseHold: {
//     name: {}
//   }
// }

// @Component({
//   beforeRouteEnter: beforeRouteEnter,
// })
// export default class HouseHoldUpdate extends mixins(HouseHoldService, AccountCategoriesService, UserService) {
//   houseHold: IHouseHold = {};

//   accountCategoriess = [];
//   users = [];
//   isSaving = false;

//   save() {
//     this.isSaving = true;
//     if (this.houseHold.id) {
//       this.updateHouseHold(this.houseHold).then(() => {
//         this.$router.go(-1);
//         this.isSaving = false;
//       });
//     } else {
//       this.createHouseHold(this.houseHold).then(() => {
//         this.$router.go(-1);
//         this.isSaving = false;
//       });
//     }
//   }

//   retrieveHouseHold(houseHoldId) {
//     this.findHouseHold(houseHoldId).then(res => {
//       this.houseHold = res.data;
//     });
//   }

//   initRelationships() {
//     this.retrieveAccountCategories().then(res => {
//       this.accountCategoriess = res.data;
//     });
//     this.retrieveUsers().then(res => {
//       this.users = res.data;
//     });
//   }

//   getSelected(selectedVals, option) {
//     if (selectedVals) {
//       for (let i = 0; i < selectedVals.length; i++) {
//         if (option.id === selectedVals[i].id) {
//           return selectedVals[i];
//         }
//       }
//     }
//     return option;
//   }

//   previousState() {
//     this.$router.go(-1);
//   }

// }
