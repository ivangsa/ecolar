import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IAccountCategories } from 'app/shared/model/account-categories.model';
import { ICategory, findCategory } from 'app/shared/model/category.model';
import { HouseHoldService } from '../house-hold.service';
import { IHouseHold } from 'app/shared/model/house-hold.model';

@Component({
    selector: 'eco-account-categories',
    templateUrl: './account-categories.component.html'
})
export class AccountCategoriesComponent implements OnInit, OnDestroy {
    houseHold: IHouseHold;
    categories: IAccountCategories[];
    eventSubscriber: Subscription;
    private ngbModalRef: NgbModalRef;

    constructor(
        private service: HouseHoldService,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.service.find(params.houseHoldId).subscribe(res => this.reload(res.body));
        });
    }

    reload(houseHold: IHouseHold) {
        this.houseHold = houseHold;
        this.categories = houseHold.accountCategories.categories;
    }

    onDelete(categoryId) {
        console.log('onDelete', categoryId);
        setTimeout(() => {
            const category = findCategory(this.houseHold.accountCategories.categories, categoryId);
            this.ngbModalRef = this.modalService.open(CategoryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
            this.ngbModalRef.componentInstance.category = category;
            this.ngbModalRef.result.then(
                result => {
                    console.log('result', result);
                    this.ngbModalRef.close();
                    this.ngbModalRef = null;
                },
                reason => {
                    console.log('reason', reason);
                    if (reason === true) {
                        this.service.deleteCategory(this.houseHold.id, categoryId).subscribe(res => {
                            this.reload(res.body);
                            this.jhiAlertService.info('appEcolar.accountCategories.deleted', category.name); // TODO not working
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

@Component({
    selector: 'eco-account-category-tree',
    templateUrl: './account-categories-tree.component.html'
})
export class AccountCategoryTreeComponent {
    @Input()
    houseHoldId: string;
    @Input()
    categories: ICategory[];

    @Output()
    delete = new EventEmitter();
}

@Component({
    selector: 'eco-category-delete-dialog',
    templateUrl: './account-categories-delete-dialog.component.html'
})
export class CategoryDeleteDialogComponent {
    category: ICategory;

    constructor(public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.activeModal.dismiss(true);
    }
}
