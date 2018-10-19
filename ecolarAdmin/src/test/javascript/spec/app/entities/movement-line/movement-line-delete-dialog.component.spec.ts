/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EcolarAdminTestModule } from '../../../test.module';
import { MovementLineDeleteDialogComponent } from 'app/entities/movement-line/movement-line-delete-dialog.component';
import { MovementLineService } from 'app/entities/movement-line/movement-line.service';

describe('Component Tests', () => {
    describe('MovementLine Management Delete Component', () => {
        let comp: MovementLineDeleteDialogComponent;
        let fixture: ComponentFixture<MovementLineDeleteDialogComponent>;
        let service: MovementLineService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [MovementLineDeleteDialogComponent]
            })
                .overrideTemplate(MovementLineDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MovementLineDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovementLineService);
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
