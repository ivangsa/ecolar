import EAccountService from './e-account.service.vue';

const EAccountDetails = {
  mixins: [EAccountService],
  data() {
    return {
      eAccount: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.eAccountId) {
        vm.retrieveEAccount(to.params.eAccountId);
      }
    });
  },
  methods: {
    retrieveEAccount(eAccountId) {
      this.findEAccount(eAccountId).then(res => {
        this.eAccount = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    }
  }
};

export default EAccountDetails;
