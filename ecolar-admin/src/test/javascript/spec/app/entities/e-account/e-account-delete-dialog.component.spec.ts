/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EcolarTestModule } from '../../../test.module';
import { EAccountDeleteDialogComponent } from 'app/entities/e-account/e-account-delete-dialog.component';
import { EAccountService } from 'app/entities/e-account/e-account.service';

describe('Component Tests', () => {
    describe('EAccount Management Delete Component', () => {
        let comp: EAccountDeleteDialogComponent;
        let fixture: ComponentFixture<EAccountDeleteDialogComponent>;
        let service: EAccountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [EAccountDeleteDialogComponent]
            })
                .overrideTemplate(EAccountDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EAccountDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EAccountService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
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
            ));
        });
    });
});
