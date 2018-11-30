import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategory } from 'app/shared/model/category.model';
import { HouseHoldService } from '../house-hold.service';

@Component({
    selector: 'eco-category-delete-dialog',
    templateUrl: './category-delete-dialog.component.html'
})
export class CategoryDeleteDialogComponent {
    category: ICategory;
    houseHoldId: string;

    constructor(private categoryService: HouseHoldService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.categoryService.deleteCategory(this.houseHoldId, id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categoryListModification',
                content: 'Deleted an category'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'eco-category-delete-popup',
    template: ''
})
export class CategoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ category }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CategoryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.category = category;
                this.ngbModalRef.componentInstance.houseHoldId = this.activatedRoute.params._value['houseHoldId'];
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
