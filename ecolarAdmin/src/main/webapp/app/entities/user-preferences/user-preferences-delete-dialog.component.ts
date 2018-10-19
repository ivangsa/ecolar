import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserPreferences } from 'app/shared/model/user-preferences.model';
import { UserPreferencesService } from './user-preferences.service';

@Component({
    selector: 'eco-user-preferences-delete-dialog',
    templateUrl: './user-preferences-delete-dialog.component.html'
})
export class UserPreferencesDeleteDialogComponent {
    userPreferences: IUserPreferences;

    constructor(
        private userPreferencesService: UserPreferencesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.userPreferencesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userPreferencesListModification',
                content: 'Deleted an userPreferences'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'eco-user-preferences-delete-popup',
    template: ''
})
export class UserPreferencesDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userPreferences }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserPreferencesDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userPreferences = userPreferences;
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
