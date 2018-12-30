import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import EAccountService from '../e-account/e-account.service';
import { IEAccount } from '@/shared/model/e-account.model';

import AlertService from '@/shared/alert/alert.service';
import { IMovementLine, MovementLine } from '@/shared/model/movement-line.model';
import MovementLineService from './movement-line.service';

const validations: any = {
    movementLine: {
        amount: {},
        eventType: {}
    }
};

@Component({
    validations
})
export default class MovementLineUpdate extends Vue {
    @Inject('alertService') private alertService: () => AlertService;
    @Inject('movementLineService') private movementLineService: () => MovementLineService;
    public movementLine: IMovementLine = new MovementLine();

    @Inject('eAccountService') private eAccountService: () => EAccountService;
    public eAccounts: IEAccount[] = [];
    public isSaving: boolean = false;

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (to.params.movementLineId) {
                vm.retrieveMovementLine(to.params.movementLineId);
            }
            vm.initRelationships();
        });
    }

    public save(): void {
        this.isSaving = true;
        if (this.movementLine.id) {
            this.movementLineService()
                .update(this.movementLine)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.movementLine.updated', { param: param.id });
                    this.alertService().showAlert(message, 'info');
                });
        } else {
            this.movementLineService()
                .create(this.movementLine)
                .then(param => {
                    this.isSaving = false;
                    this.$router.go(-1);
                    const message = this.$t('ecolarApp.movementLine.created', { param: param.id });
                    this.alertService().showAlert(message, 'success');
                });
        }
    }

    public retrieveMovementLine(movementLineId): void {
        this.movementLineService()
            .find(movementLineId)
            .then(res => {
                this.movementLine = res;
            });
    }

    public previousState(): void {
        this.$router.go(-1);
    }

    public initRelationships(): void {
        this.eAccountService()
            .retrieve()
            .then(res => {
                this.eAccounts = res.data;
            });
    }
}
