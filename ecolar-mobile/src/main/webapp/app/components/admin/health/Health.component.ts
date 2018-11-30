import EcoHealthModal from './HealthModal.vue';
import HealthService from './HealthService.vue';

const EcoHealthComponent = {
  name: 'EcoHealthComponent',
  mixins: [HealthService],
  components: {
    'health-modal': EcoHealthModal
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.refresh();
    });
  },
  data() {
    return {
      healthData: null,
      currentHealth: null,
      updatingHealth: false
    };
  },
  methods: {
    baseName(name) {
      return this.getBaseName(name);
    },
    getBadgeClass(statusState) {
      if (statusState === 'UP') {
        return 'badge-success';
      } else {
        return 'badge-danger';
      }
    },
    refresh() {
      this.updatingHealth = true;
      this.checkHealth()
        .then(res => {
          this.healthData = this.transformHealthData(res.data);
          this.updatingHealth = false;
        })
        .catch(error => {
          if (error.status === 503) {
            this.healthData = this.transformHealthData(error.error);
          }
          this.updatingHealth = false;
        });
    },
    showHealth(health) {
      this.currentHealth = health;
      this.$refs.healthModal.show();
    },
    subSystemName(name) {
      return this.getSubSystemName(name);
    }
  }
};

export default EcoHealthComponent;
