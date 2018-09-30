/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EcolarAdminTestModule } from '../../../test.module';
import { AccountsDocumentDeleteDialogComponent } from 'app/entities/accounts-document/accounts-document-delete-dialog.component';
import { AccountsDocumentService } from 'app/entities/accounts-document/accounts-document.service';

describe('Component Tests', () => {
    describe('AccountsDocument Management Delete Component', () => {
        let comp: AccountsDocumentDeleteDialogComponent;
        let fixture: ComponentFixture<AccountsDocumentDeleteDialogComponent>;
        let service: AccountsDocumentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [AccountsDocumentDeleteDialogComponent]
            })
                .overrideTemplate(AccountsDocumentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountsDocumentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsDocumentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
