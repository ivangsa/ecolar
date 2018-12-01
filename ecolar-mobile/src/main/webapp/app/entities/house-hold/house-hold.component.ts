import Principal from '../../components/account/Principal.vue';
import HouseHoldService from './house-hold.service.vue';

const HouseHold = {
  mixins: [Principal, HouseHoldService],
  data() {
    return {
      removeId: null,
      houseHolds: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.retrieveAllHouseHolds();
    });
  },
  methods: {
    retrieveAllHouseHolds() {
      this.retrieveHouseHolds().then(res => {
        this.houseHolds = res.data;
      });
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      this.$refs.removeEntity.show();
    },
    removeHouseHold() {
      this.deleteHouseHold(this.removeId).then(() => {
        this.removeId = null;
        this.retrieveAllHouseHolds();
        this.closeDialog();
      });
    },
    closeDialog() {
      this.$refs.removeEntity.hide();
    }
  }
};

export default HouseHold;
