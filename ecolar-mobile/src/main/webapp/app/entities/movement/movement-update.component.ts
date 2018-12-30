import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { DATE_TIME_LONG_FORMAT, INSTANT_FORMAT, ZONED_DATE_TIME_FORMAT } from '@/shared/date/filters';

import MovementLineService from '../movement-line/movement-line.service';
import { IMovementLine } from '@/shared/model/movement-line.model';

import AlertService from '@/shared/alert/alert.service';
import { IMovement, Movement } from '@/shared/model/movement.model';
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
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('movementService') private movementService: () => MovementService;
    public movement: IMovement = new Movement();

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
        if (this.movement.id) {
            this.movementService()
                .update(this.movement)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.movement.updated', { param: param.id });
                    this.alertService().showAlert(message, 'info');
                });
        } else {
            this.movementService()
                .create(this.movement)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.movement.created', { param: param.id });
                    this.alertService().showAlert(message, 'success');
                });
        }
    }

    public convertDateTimeFromServer(date: Date): string {
        if (date) {
            return format(date, DATE_TIME_LONG_FORMAT);
        }
        return null;
    }

    public updateInstantField(field, event) {
        if (event.target.value) {
            this.movement[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
        } else {
            this.movement[field] = null;
        }
    }

    public updateZonedDateTimeField(field, event) {
        if (event.target.value) {
            this.movement[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
        } else {
            this.movement[field] = null;
        }
    }

    public retrieveMovement(movementId): void {
        this.movementService()
            .find(movementId)
            .then(res => {
                this.movement = res;

                if (this.movement.eventTime) {
                    this.movement.eventTime = parse(this.movement.eventTime.toString(), INSTANT_FORMAT, new Date());
                }
                if (this.movement.registrationTime) {
                    this.movement.registrationTime = parse(this.movement.registrationTime.toString(), INSTANT_FORMAT, new Date());
                }
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
