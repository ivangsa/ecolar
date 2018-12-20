import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMovementLine } from '@/shared/model/movement-line.model';
import MovementLineService from './movement-line.service';

const beforeRouteEnter = (to, from, next) => {
    next(vm => {
        if (to.params.movementLineId) {
            vm.retrieveMovementLine(to.params.movementLineId);
        }
    });
};

@Component({
    beforeRouteEnter
})
export default class MovementLineDetails extends Vue {
    @Inject('movementLineService') private movementLineService: () => MovementLineService;
    public movementLine: IMovementLine;

    constructor() {
        super();
        this.movementLine = {};
    }

    public retrieveMovementLine(movementLineId) {
        this.movementLineService()
            .find(movementLineId)
            .then(res => {
                this.movementLine = res;
            });
    }

    public previousState() {
        this.$router.go(-1);
    }
}
