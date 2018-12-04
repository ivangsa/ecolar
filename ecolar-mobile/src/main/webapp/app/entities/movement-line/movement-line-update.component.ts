import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import MovementLineService from './movement-line.service.vue';
import EAccountService from '../e-account/e-account.service.vue';

const MovementLineUpdate = {
  mixins: [MovementLineService, EAccountService],
  data() {
    return {
      movementLine: {
        amount: null,
        eventType: null,
        eAccounts: []
      },
      eAccounts: [],
      isSaving: false
    };
  },
  validations: {
    movementLine: {
      amount: {},
      eventType: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.movementLineId) {
        vm.retrieveMovementLine(to.params.movementLineId);
      }
      vm.initRelationships();
    });
  },
  methods: {
    save() {
      this.isSaving = true;
      if (this.movementLine.id) {
        this.updateMovementLine(this.movementLine).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      } else {
        this.createMovementLine(this.movementLine).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      }
    },
    retrieveMovementLine(movementLineId) {
      this.findMovementLine(movementLineId).then(res => {
        this.movementLine = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    },
    initRelationships() {
      this.retrieveEAccounts().then(res => {
        this.eAccounts = res.data;
      });
    }
  }
};

export default MovementLineUpdate;
