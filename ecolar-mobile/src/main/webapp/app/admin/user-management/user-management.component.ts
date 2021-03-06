import { Component, Inject, Vue } from 'vue-property-decorator';
import UserManagementService from './user-management.service';
import Principal from '@/account/principal';

@Component
export default class EcoUserManagementComponent extends Vue {
    @Inject('userService') private userManagementService: () => UserManagementService;
    @Inject('principal') private principal: () => Principal;
    public error: string = '';
    public success: string = '';
    public users: any[] = [];
    public itemsPerPage: number = 20;
    public queryCount: number = null;
    public page: number = 1;
    public previousPage: number = null;
    public propOrder: string = 'id';
    public reverse: boolean = false;
    public totalItems: number = 0;
    public removeId: number = null;

    public mounted(): void {
        this.loadAll();
    }

    public setActive(user, isActivated): void {
        user.activated = isActivated;
        this.userManagementService()
            .update(user)
            .then(() => {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            })
            .catch(() => {
                this.success = null;
                this.error = 'ERROR';
                user.activated = false;
            });
    }

    public loadAll(): void {
        this.userManagementService()
            .retrieve({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .then(res => {
                this.users = res.data;
                this.totalItems = Number(res.headers['x-total-count']);
                this.queryCount = this.totalItems;
            });
    }

    public sort(): any {
        const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.propOrder !== 'id') {
            result.push('id');
        }
        return result;
    }

    public loadPage(page: number): void {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    public transition(): void {
        this.loadAll();
    }

    public changeOrder(propOrder: string): void {
        this.propOrder = propOrder;
        this.reverse = !this.reverse;
    }

    public deleteUser(): void {
        this.userManagementService()
            .remove(this.removeId)
            .then(() => {
                this.removeId = null;
                this.loadAll();
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.login;
    }

    public get username(): string {
        return this.principal().username;
    }
}
