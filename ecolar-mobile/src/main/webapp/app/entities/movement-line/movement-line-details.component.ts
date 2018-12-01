import MovementLineService from './movement-line.service.vue';

const MovementLineDetails = {
  mixins: [MovementLineService],
  data() {
    return {
      movementLine: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.movementLineId) {
        vm.retrieveMovementLine(to.params.movementLineId);
      }
    });
  },
  methods: {
    retrieveMovementLine(movementLineId) {
      this.findMovementLine(movementLineId).then(res => {
        this.movementLine = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    }
  }
};

export default MovementLineDetails;
