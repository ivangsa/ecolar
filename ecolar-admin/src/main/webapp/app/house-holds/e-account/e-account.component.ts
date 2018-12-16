import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { findEAccount, getAllCategories, getAllEAccounts, ICategory } from 'app/shared/model/category.model';
import { IEAccount } from 'app/shared/model/e-account.model';
import { IHouseHold } from 'app/shared/model/house-hold.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { HouseHoldService } from '../house-hold.service';

@Component({
    selector: 'eco-e-account',
    templateUrl: './e-account.component.html'
})
export class EAccountComponent implements OnInit, OnDestroy {
    houseHold: IHouseHold;
    categoryId: string;
    categories: ICategory[];
    categoriesMap: Map<string, ICategory>;
    eAccounts: IEAccount[];
    eventSubscriber: Subscription;
    private ngbModalRef: NgbModalRef;

    constructor(
        private service: HouseHoldService,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.categoryId = params.categoryId;
            this.service.find(params.houseHoldId).subscribe(res => this.reload(res.body));
        });
    }

    reload(houseHold: IHouseHold) {
        this.houseHold = houseHold;
        this.categories = getAllCategories(this.houseHold.accountCategories.categories);
        this.categoriesMap = this.categories.reduce((m, c) => m.set(c.id, c), new Map());
        this.filterAccounts();
    }

    filterAccounts() {
        // TODO update ;categoryId in url
        // this.router.navigate([...this.activatedRoute.snapshot.url, {categoryId: this.categoryId}]);
        this.eAccounts = getAllEAccounts([this.categoriesMap.get(this.categoryId)]);
    }

    onDelete(accountId) {
        console.log('onDelete', accountId);
        setTimeout(() => {
            const account = findEAccount(this.houseHold, accountId);
            this.ngbModalRef = this.modalService.open(EAccountDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
            this.ngbModalRef.componentInstance.eAccount = account;
            this.ngbModalRef.result.then(
                result => {
                    console.log('result', result);
                    this.ngbModalRef.close();
                    this.ngbModalRef = null;
                },
                reason => {
                    console.log('reason', reason);
                    if (reason === true) {
                        this.service.deleteEAccount(this.houseHold.id, accountId).subscribe(res => {
                            this.reload(res.body);
                            this.jhiAlertService.info('appEcolar.EAccounts.deleted', account.name); // TODO not working
                        });
                    }
                    this.ngbModalRef.close();
                    this.ngbModalRef = null;
                }
            );
        }, 0);
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }

    trackCategoryById(index: number, item: ICategory) {
        return item.id;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

@Component({
    selector: 'eco-account-delete-dialog',
    templateUrl: './e-account-delete-dialog.component.html'
})
export class EAccountDeleteDialogComponent {
    account: IEAccount;

    constructor(public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.activeModal.dismiss(true);
    }
}
