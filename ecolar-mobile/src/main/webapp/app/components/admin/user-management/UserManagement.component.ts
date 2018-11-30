import UserManagementService from './UserManagementService.vue';
import Principal from '../../account/Principal.vue';

const EcoUserManagementComponent = {
  name: 'EcoUserManagementComponent',
  mixins: [UserManagementService, Principal],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadAll();
    });
  },
  data() {
    return {
      error: false,
      success: false,
      users: [],
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: null,
      propOrder: 'id',
      reverse: false,
      totalItems: 0,
      removeId: null
    };
  },
  methods: {
    setActive(user, isActivated) {
      user.activated = isActivated;
      this.update(user)
        .then(() => {
          this.error = null;
          this.success = 'OK';
          this.loadAll();
        })
        .catch(() => {
          this.success = null;
          this.error = 'ERROR';
          user.activated = false;
        });
    },
    loadAll() {
      this.query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      }).then(res => {
        this.users = res.data;
        this.totalItems = Number(res.headers['x-total-count']);
        this.queryCount = this.totalItems;
      });
    },
    sort() {
      const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
      if (this.propOrder !== 'id') {
        result.push('id');
      }
      return result;
    },
    loadPage(page: number) {
      if (page !== this.previousPage) {
        this.previousPage = page;
        this.transition();
      }
    },
    transition() {
      this.loadAll();
    },
    changeOrder(propOrder) {
      this.propOrder = propOrder;
      this.reverse = !this.reverse;
    },
    deleteUser() {
      this.remove(this.removeId).then(() => {
        this.removeId = null;
        this.loadAll();
      });
    },
    prepareRemove(instance) {
      this.removeId = instance.login;
    }
  }
};

export default EcoUserManagementComponent;
