import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMovement } from '@/shared/model/movement.model';
import MovementService from './movement.service';

const beforeRouteEnter = (to, from, next) => {
    next(vm => {
        if (to.params.movementId) {
            vm.retrieveMovement(to.params.movementId);
        }
    });
};

@Component({
    beforeRouteEnter
})
export default class MovementDetails extends Vue {
    @Inject('movementService') private movementService: () => MovementService;
    public movement: IMovement;

    constructor() {
        super();
        this.movement = {};
    }

    public retrieveMovement(movementId) {
        this.movementService()
            .find(movementId)
            .then(res => {
                this.movement = res;
            });
    }

    public previousState() {
        this.$router.go(-1);
    }
}
