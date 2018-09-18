import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccountingEvent } from 'app/shared/model/accounting-event.model';
import { AccountingEventService } from './accounting-event.service';

@Component({
    selector: 'jhi-accounting-event-delete-dialog',
    templateUrl: './accounting-event-delete-dialog.component.html'
})
export class AccountingEventDeleteDialogComponent {
    accountingEvent: IAccountingEvent;

    constructor(
        private accountingEventService: AccountingEventService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.accountingEventService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accountingEventListModification',
                content: 'Deleted an accountingEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-accounting-event-delete-popup',
    template: ''
})
export class AccountingEventDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountingEvent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AccountingEventDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.accountingEvent = accountingEvent;
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
