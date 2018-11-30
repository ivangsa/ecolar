import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHouseHold } from 'app/shared/model/house-hold.model';
import { HouseHoldService } from '../house-hold.service';

@Component({
    selector: 'eco-house-hold-delete-dialog',
    templateUrl: './house-hold-delete-dialog.component.html'
})
export class HouseHoldDeleteDialogComponent {
    houseHold: IHouseHold;

    constructor(private houseHoldService: HouseHoldService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.houseHoldService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'houseHoldListModification',
                content: 'Deleted an houseHold'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'eco-house-hold-delete-popup',
    template: ''
})
export class HouseHoldDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ houseHold }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HouseHoldDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.houseHold = houseHold;
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
