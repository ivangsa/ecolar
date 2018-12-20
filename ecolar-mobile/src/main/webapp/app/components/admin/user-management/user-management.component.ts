import { mixins } from 'vue-class-component';
import { Component, Inject } from 'vue-property-decorator';
import UserManagementService from './user-management.service';
import Principal from '../../account/principal';

@Component
export default class EcoUserManagementComponent extends mixins(Principal) {
  @Inject('userService') private userManagementService: () => UserManagementService;
  public error: string;
  public success: string;
  public users: any[];
  public itemsPerPage: number;
  public queryCount: number;
  public page: number;
  public previousPage: number;
  public propOrder: string;
  public reverse: boolean;
  public totalItems: number;
  public removeId: number;

  constructor() {
    super();
    this.error = '';
    this.success = '';
    this.users = [];
    this.itemsPerPage = 20;
    this.queryCount = null;
    this.page = 1;
    this.previousPage = null;
    this.propOrder = 'id';
    this.reverse = false;
    this.totalItems = 0;
    this.removeId = null;
  }

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
}
