import HouseHoldService from './house-hold.service.vue';

const HouseHoldDetails = {
  mixins: [HouseHoldService],
  data() {
    return {
      houseHold: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.houseHoldId) {
        vm.retrieveHouseHold(to.params.houseHoldId);
      }
    });
  },
  methods: {
    retrieveHouseHold(houseHoldId) {
      this.findHouseHold(houseHoldId).then(res => {
        this.houseHold = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    }
  }
};

export default HouseHoldDetails;
