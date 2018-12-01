import Principal from '../../components/account/Principal.vue';
import MovementService from './movement.service.vue';

const Movement = {
  mixins: [Principal, MovementService],
  data() {
    return {
      removeId: null,
      movements: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.retrieveAllMovements();
    });
  },
  methods: {
    retrieveAllMovements() {
      this.retrieveMovements().then(res => {
        this.movements = res.data;
      });
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      this.$refs.removeEntity.show();
    },
    removeMovement() {
      this.deleteMovement(this.removeId).then(() => {
        this.removeId = null;
        this.retrieveAllMovements();
        this.closeDialog();
      });
    },
    closeDialog() {
      this.$refs.removeEntity.hide();
    }
  }
};

export default Movement;
