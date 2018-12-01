import Principal from '../../components/account/Principal.vue';
import UserPreferencesService from './user-preferences.service.vue';

const UserPreferences = {
  mixins: [Principal, UserPreferencesService],
  data() {
    return {
      removeId: null,
      userPreferences: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.retrieveAllUserPreferencess();
    });
  },
  methods: {
    retrieveAllUserPreferencess() {
      this.retrieveUserPreferencess().then(res => {
        this.userPreferences = res.data;
      });
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      this.$refs.removeEntity.show();
    },
    removeUserPreferences() {
      this.deleteUserPreferences(this.removeId).then(() => {
        this.removeId = null;
        this.retrieveAllUserPreferencess();
        this.closeDialog();
      });
    },
    closeDialog() {
      this.$refs.removeEntity.hide();
    }
  }
};

export default UserPreferences;
