import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';

import MovementService from './movement.service.vue';
import MovementLineService from '../movement-line/movement-line.service.vue';

const MovementUpdate = {
  mixins: [MovementService, MovementLineService],
  data() {
    return {
      movement: {
        eventTime: null,
        registrationTime: null,
        amount: null,
        location: null,
        movementLines: []
      },
      movementLines: [],
      isSaving: false
    };
  },
  validations: {
    movement: {
      eventTime: {},
      registrationTime: {},
      amount: {},
      location: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.movementId) {
        vm.retrieveMovement(to.params.movementId);
      }
      vm.initRelationships();
    });
  },
  methods: {
    save() {
      this.isSaving = true;
      this.movement.eventTime = moment(this.movement.eventTime, 'YYYY-MM-DDTHH:mm');
      this.movement.registrationTime = moment(this.movement.registrationTime, 'YYYY-MM-DDTHH:mm');
      if (this.movement.id) {
        this.updateMovement(this.movement).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      } else {
        this.createMovement(this.movement).then(() => {
          this.$router.go(-1);
          this.isSaving = false;
        });
      }
    },
    retrieveMovement(movementId) {
      this.findMovement(movementId).then(res => {
        this.movement = res.data;

        this.movement.eventTime = moment(this.movement.eventTime, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DDTHH:mm');
        this.movement.registrationTime = moment(this.movement.registrationTime, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DDTHH:mm');
      });
    },
    previousState() {
      this.$router.go(-1);
    },
    initRelationships() {
      this.retrieveMovementLines().then(res => {
        this.movementLines = res.data;
      });
    },
    getSelected(selectedVals, option) {
      if (selectedVals) {
        for (let i = 0; i < selectedVals.length; i++) {
          if (option.id === selectedVals[i].id) {
            return selectedVals[i];
          }
        }
      }
      return option;
    }
  }
};

export default MovementUpdate;
