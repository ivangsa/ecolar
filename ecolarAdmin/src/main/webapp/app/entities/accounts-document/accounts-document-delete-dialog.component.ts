import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccountsDocument } from 'app/shared/model/accounts-document.model';
import { AccountsDocumentService } from './accounts-document.service';

@Component({
    selector: 'eco-accounts-document-delete-dialog',
    templateUrl: './accounts-document-delete-dialog.component.html'
})
export class AccountsDocumentDeleteDialogComponent {
    accountsDocument: IAccountsDocument;

    constructor(
        private accountsDocumentService: AccountsDocumentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.accountsDocumentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accountsDocumentListModification',
                content: 'Deleted an accountsDocument'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'eco-accounts-document-delete-popup',
    template: ''
})
export class AccountsDocumentDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountsDocument }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AccountsDocumentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.accountsDocument = accountsDocument;
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
