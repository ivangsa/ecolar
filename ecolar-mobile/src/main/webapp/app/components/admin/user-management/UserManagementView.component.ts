import UserManagementService from './UserManagementService.vue';

const EcoUserManagementViewComponent = {
  name: 'EcoUserManagementViewComponent',
  mixins: [UserManagementService],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.userId) {
        vm.init(to.params.userId);
      }
    });
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    init: function(userId) {
      this.get(userId).then(res => {
        this.user = res.data;
      });
    }
  }
};

export default EcoUserManagementViewComponent;