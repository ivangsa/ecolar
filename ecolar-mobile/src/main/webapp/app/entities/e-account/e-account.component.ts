import Principal from '../../components/account/Principal.vue';
import EAccountService from './e-account.service.vue';

const EAccount = {
  mixins: [Principal, EAccountService],
  data() {
    return {
      removeId: null,
      eAccounts: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.retrieveAllEAccounts();
    });
  },
  methods: {
    retrieveAllEAccounts() {
      this.retrieveEAccounts().then(res => {
        this.eAccounts = res.data;
      });
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      this.$refs.removeEntity.show();
    },
    removeEAccount() {
      this.deleteEAccount(this.removeId).then(() => {
        this.removeId = null;
        this.retrieveAllEAccounts();
        this.closeDialog();
      });
    },
    closeDialog() {
      this.$refs.removeEntity.hide();
    }
  }
};

export default EAccount;
