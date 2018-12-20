import { mixins } from 'vue-class-component';
import { Component, Inject } from 'vue-property-decorator';
import Principal from '@/account/principal';
import { IMovement } from '@/shared/model/movement.model';

import MovementService from './movement.service';

@Component
export default class Movement extends mixins(Principal) {
    @Inject('movementService') private movementService: () => MovementService;
    private removeId: string = null;
    public movements: IMovement[] = [];

    public mounted(): void {
        this.retrieveAllMovements();
    }

    public clear(): void {
        this.retrieveAllMovements();
    }

    public retrieveAllMovements(): void {
        this.movementService()
            .retrieve()
            .then(res => {
                this.movements = res.data;
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.id;
    }

    public removeMovement(): void {
        this.movementService()
            .delete(this.removeId)
            .then(() => {
                this.removeId = null;
                this.retrieveAllMovements();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
