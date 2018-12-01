import Principal from '../../components/account/Principal.vue';
import AccountCategoriesService from './account-categories.service.vue';

const AccountCategories = {
  mixins: [Principal, AccountCategoriesService],
  data() {
    return {
      removeId: null,
      accountCategories: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.retrieveAllAccountCategoriess();
    });
  },
  methods: {
    retrieveAllAccountCategoriess() {
      this.retrieveAccountCategoriess().then(res => {
        this.accountCategories = res.data;
      });
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      this.$refs.removeEntity.show();
    },
    removeAccountCategories() {
      this.deleteAccountCategories(this.removeId).then(() => {
        this.removeId = null;
        this.retrieveAllAccountCategoriess();
        this.closeDialog();
      });
    },
    closeDialog() {
      this.$refs.removeEntity.hide();
    }
  }
};

export default AccountCategories;
