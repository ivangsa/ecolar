import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEAccount } from 'app/shared/model/e-account.model';
import { EAccountService } from './e-account.service';

@Component({
    selector: 'eco-e-account-delete-dialog',
    templateUrl: './e-account-delete-dialog.component.html'
})
export class EAccountDeleteDialogComponent {
    eAccount: IEAccount;

    constructor(private eAccountService: EAccountService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.eAccountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'eAccountListModification',
                content: 'Deleted an eAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'eco-e-account-delete-popup',
    template: ''
})
export class EAccountDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eAccount }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EAccountDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.eAccount = eAccount;
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
