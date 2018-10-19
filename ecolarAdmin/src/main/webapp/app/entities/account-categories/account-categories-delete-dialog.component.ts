import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccountCategories } from 'app/shared/model/account-categories.model';
import { AccountCategoriesService } from './account-categories.service';

@Component({
    selector: 'eco-account-categories-delete-dialog',
    templateUrl: './account-categories-delete-dialog.component.html'
})
export class AccountCategoriesDeleteDialogComponent {
    accountCategories: IAccountCategories;

    constructor(
        private accountCategoriesService: AccountCategoriesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.accountCategoriesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accountCategoriesListModification',
                content: 'Deleted an accountCategories'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'eco-account-categories-delete-popup',
    template: ''
})
export class AccountCategoriesDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountCategories }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AccountCategoriesDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.accountCategories = accountCategories;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
