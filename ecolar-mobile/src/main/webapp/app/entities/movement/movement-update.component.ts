import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';

import MovementLineService from '../movement-line/movement-line.service';
import { IMovementLine } from '@/shared/model/movement-line.model';

import { IMovement } from '@/shared/model/movement.model';
import MovementService from './movement.service';

const validations: any = {
    movement: {
        type: {},
        eventTime: {},
        registrationTime: {},
        amount: {},
        location: {}
    }
};

@Component({
    validations
})
export default class MovementUpdate extends Vue {
    @Inject('movementService') private movementService: () => MovementService;
    public movement: IMovement = {};

    @Inject('movementLineService') private movementLineService: () => MovementLineService;
    public movementLines: IMovementLine[] = [];
    public isSaving: boolean = false;

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.movementId) {
                vm.retrieveMovement(to.params.movementId);
            }
            vm.initRelationships();
        });
    }

    public save(): void {
        this.isSaving = true;
        this.movement.eventTime = moment(this.movement.eventTime, 'YYYY-MM-DDTHH:mm');
        this.movement.registrationTime = moment(this.movement.registrationTime, 'YYYY-MM-DDTHH:mm');
        if (this.movement.id) {
            this.movementService()
                .update(this.movement)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        } else {
            this.movementService()
                .create(this.movement)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        }
    }

    public retrieveMovement(movementId): void {
        this.movementService()
            .find(movementId)
            .then(res => {
                this.movement = res;

                this.movement.eventTime = moment(this.movement.eventTime, 'YYYY-MM-DDTHH:mm:ssZ');
                this.movement.registrationTime = moment(this.movement.registrationTime, 'YYYY-MM-DDTHH:mm:ssZ');
            });
    }

    public previousState(): void {
        this.$router.go(-1);
    }

    public initRelationships(): void {
        this.movementLineService()
            .retrieve()
            .then(res => {
                this.movementLines = res.data;
            });
    }

    public getSelected(selectedVals, option): any {
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
