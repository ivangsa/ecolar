import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMovementLine } from 'app/shared/model/movement-line.model';
import { MovementLineService } from './movement-line.service';

@Component({
    selector: 'eco-movement-line-delete-dialog',
    templateUrl: './movement-line-delete-dialog.component.html'
})
export class MovementLineDeleteDialogComponent {
    movementLine: IMovementLine;

    constructor(
        private movementLineService: MovementLineService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.movementLineService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'movementLineListModification',
                content: 'Deleted an movementLine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'eco-movement-line-delete-popup',
    template: ''
})
export class MovementLineDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ movementLine }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MovementLineDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.movementLine = movementLine;
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
