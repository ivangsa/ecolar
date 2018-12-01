import UserPreferencesService from './user-preferences.service.vue';

const UserPreferencesDetails = {
  mixins: [UserPreferencesService],
  data() {
    return {
      userPreferences: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.userPreferencesId) {
        vm.retrieveUserPreferences(to.params.userPreferencesId);
      }
    });
  },
  methods: {
    retrieveUserPreferences(userPreferencesId) {
      this.findUserPreferences(userPreferencesId).then(res => {
        this.userPreferences = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    }
  }
};

export default UserPreferencesDetails;
