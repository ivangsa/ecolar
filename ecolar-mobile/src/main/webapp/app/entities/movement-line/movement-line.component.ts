import Principal from '../../components/account/Principal.vue';
import MovementLineService from './movement-line.service.vue';

const MovementLine = {
  mixins: [Principal, MovementLineService],
  data() {
    return {
      removeId: null,
      movementLines: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.retrieveAllMovementLines();
    });
  },
  methods: {
    retrieveAllMovementLines() {
      this.retrieveMovementLines().then(res => {
        this.movementLines = res.data;
      });
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      this.$refs.removeEntity.show();
    },
    removeMovementLine() {
      this.deleteMovementLine(this.removeId).then(() => {
        this.removeId = null;
        this.retrieveAllMovementLines();
        this.closeDialog();
      });
    },
    closeDialog() {
      this.$refs.removeEntity.hide();
    }
  }
};

export default MovementLine;
