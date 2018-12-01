import MovementService from './movement.service.vue';

const MovementDetails = {
  mixins: [MovementService],
  data() {
    return {
      movement: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.movementId) {
        vm.retrieveMovement(to.params.movementId);
      }
    });
  },
  methods: {
    retrieveMovement(movementId) {
      this.findMovement(movementId).then(res => {
        this.movement = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    }
  }
};

export default MovementDetails;
