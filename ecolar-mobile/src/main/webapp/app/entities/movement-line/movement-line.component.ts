import { mixins } from 'vue-class-component';
import { Component, Inject } from 'vue-property-decorator';
import Principal from '@/account/principal';
import { IMovementLine } from '@/shared/model/movement-line.model';

import MovementLineService from './movement-line.service';

@Component
export default class MovementLine extends mixins(Principal) {
    @Inject('movementLineService') private movementLineService: () => MovementLineService;
    private removeId: string = null;
    public movementLines: IMovementLine[] = [];

    public mounted(): void {
        this.retrieveAllMovementLines();
    }

    public clear(): void {
        this.retrieveAllMovementLines();
    }

    public retrieveAllMovementLines(): void {
        this.movementLineService()
            .retrieve()
            .then(res => {
                this.movementLines = res.data;
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.id;
    }

    public removeMovementLine(): void {
        this.movementLineService()
            .delete(this.removeId)
            .then(() => {
                this.removeId = null;
                this.retrieveAllMovementLines();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
