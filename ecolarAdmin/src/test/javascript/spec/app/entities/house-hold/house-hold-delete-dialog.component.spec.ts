/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EcolarAdminTestModule } from '../../../test.module';
import { HouseHoldDeleteDialogComponent } from 'app/entities/house-hold/house-hold-delete-dialog.component';
import { HouseHoldService } from 'app/entities/house-hold/house-hold.service';

describe('Component Tests', () => {
    describe('HouseHold Management Delete Component', () => {
        let comp: HouseHoldDeleteDialogComponent;
        let fixture: ComponentFixture<HouseHoldDeleteDialogComponent>;
        let service: HouseHoldService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [HouseHoldDeleteDialogComponent]
            })
                .overrideTemplate(HouseHoldDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HouseHoldDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseHoldService);
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
