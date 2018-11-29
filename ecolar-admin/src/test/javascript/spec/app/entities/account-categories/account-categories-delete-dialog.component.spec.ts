/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EcolarTestModule } from '../../../test.module';
import { AccountCategoriesDeleteDialogComponent } from 'app/entities/account-categories/account-categories-delete-dialog.component';
import { AccountCategoriesService } from 'app/entities/account-categories/account-categories.service';

describe('Component Tests', () => {
    describe('AccountCategories Management Delete Component', () => {
        let comp: AccountCategoriesDeleteDialogComponent;
        let fixture: ComponentFixture<AccountCategoriesDeleteDialogComponent>;
        let service: AccountCategoriesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountCategoriesDeleteDialogComponent]
            })
                .overrideTemplate(AccountCategoriesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountCategoriesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountCategoriesService);
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
