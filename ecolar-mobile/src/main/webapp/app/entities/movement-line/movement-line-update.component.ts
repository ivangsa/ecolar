import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import EAccountService from '../e-account/e-account.service';
import { IEAccount } from '@/shared/model/e-account.model';

import { IMovementLine } from '@/shared/model/movement-line.model';
import MovementLineService from './movement-line.service';

const validations: any = {
    movementLine: {
        amount: {},
        eventType: {}
    }
};
const beforeRouteEnter = (to, from, next) => {
    next(vm => {
        if (to.params.movementLineId) {
            vm.retrieveMovementLine(to.params.movementLineId);
        }
        vm.initRelationships();
    });
};

@Component({
    validations,
    beforeRouteEnter
})
export default class MovementLineUpdate extends Vue {
    @Inject('movementLineService') private movementLineService: () => MovementLineService;
    public movementLine: IMovementLine;

    @Inject('eAccountService') private eAccountService: () => EAccountService;
    public eAccounts: IEAccount[];
    public isSaving: boolean;

    constructor() {
        super();
        this.movementLine = {
            amount: null,
            eventType: null
        };
        this.eAccounts = [];
        this.isSaving = false;
    }

    public save(): void {
        this.isSaving = true;
        if (this.movementLine.id) {
            this.movementLineService()
                .update(this.movementLine)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
                });
        } else {
            this.movementLineService()
                .create(this.movementLine)
                .then(() => {
                    this.isSaving = false;
                    this.$router.go(-1);
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
