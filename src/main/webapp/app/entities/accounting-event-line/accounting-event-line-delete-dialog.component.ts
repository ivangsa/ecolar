import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccountingEventLine } from 'app/shared/model/accounting-event-line.model';
import { AccountingEventLineService } from './accounting-event-line.service';

@Component({
    selector: 'jhi-accounting-event-line-delete-dialog',
    templateUrl: './accounting-event-line-delete-dialog.component.html'
})
export class AccountingEventLineDeleteDialogComponent {
    accountingEventLine: IAccountingEventLine;

    constructor(
        private accountingEventLineService: AccountingEventLineService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.accountingEventLineService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accountingEventLineListModification',
                content: 'Deleted an accountingEventLine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-accounting-event-line-delete-popup',
    template: ''
})
export class AccountingEventLineDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountingEventLine }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AccountingEventLineDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.accountingEventLine = accountingEventLine;
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
