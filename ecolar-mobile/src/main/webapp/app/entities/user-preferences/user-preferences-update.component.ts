import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import UserPreferencesService from './user-preferences.service.vue';
import UserService from '../user/user.service.vue';

const UserPreferencesUpdate = {
  mixins: [UserPreferencesService, UserService],
  data() {
    return {
      userPreferences: {
        users: []
      },
      users: [],
      isSaving: false
    };
  },
  validations: {
    userPreferences: {}
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.userPreferencesId) {
        vm.retrieveUserPreferences(to.params.userPreferencesId);
      }
      vm.initRelationships();
    });
  },
  methods: {
    save() {
      this.isSaving = true;
      if (this.userPreferences.id) {
        this.updateUserPreferences(this.userPreferences).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      } else {
        this.createUserPreferences(this.userPreferences).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      }
    },
    retrieveUserPreferences(userPreferencesId) {
      this.findUserPreferences(userPreferencesId).then(res => {
        this.userPreferences = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    },
    initRelationships() {
      this.retrieveUsers().then(res => {
        this.users = res.data;
      });
    }
  }
};

export default UserPreferencesUpdate;
