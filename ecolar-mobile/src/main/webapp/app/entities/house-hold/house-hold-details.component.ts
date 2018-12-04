import Component, { mixins } from 'vue-class-component';
import { IHouseHold } from '../../ecolar/model/house-hold.model';
import HouseHoldService from './house-hold.service';

const beforeRouteEnter = function(to, from, next) {
  next(vm => {
    if (to.params.houseHoldId) {
      vm.retrieveHouseHold(to.params.houseHoldId);
    }
  });
}

@Component({
  beforeRouteEnter
})
export default class HouseHoldDetails extends mixins(HouseHoldService) {
  houseHold: IHouseHold = {};

  retrieveHouseHold(houseHoldId) {
    let vm = this;
    console.log(houseHoldId);
    this.findHouseHold(houseHoldId).then(res => {
      console.log(res.data);
      vm.houseHold = res.data;
    });
  }

  previousState() {
    this.$router.go(-1);
  }

}