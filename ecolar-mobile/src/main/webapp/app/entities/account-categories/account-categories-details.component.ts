import AccountCategoriesService from './account-categories.service.vue';

const AccountCategoriesDetails = {
  mixins: [AccountCategoriesService],
  data() {
    return {
      accountCategories: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.accountCategoriesId) {
        vm.retrieveAccountCategories(to.params.accountCategoriesId);
      }
    });
  },
  methods: {
    retrieveAccountCategories(accountCategoriesId) {
      this.findAccountCategories(accountCategoriesId).then(res => {
        this.accountCategories = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    }
  }
};

export default AccountCategoriesDetails;
