/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EcolarTestModule } from '../../../test.module';
import { AccountingEventUpdateComponent } from 'app/entities/accounting-event/accounting-event-update.component';
import { AccountingEventService } from 'app/entities/accounting-event/accounting-event.service';
import { AccountingEvent } from 'app/shared/model/accounting-event.model';

describe('Component Tests', () => {
    describe('AccountingEvent Management Update Component', () => {
        let comp: AccountingEventUpdateComponent;
        let fixture: ComponentFixture<AccountingEventUpdateComponent>;
        let service: AccountingEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountingEventUpdateComponent]
            })
                .overrideTemplate(AccountingEventUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountingEventUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountingEventService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountingEvent('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountingEvent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountingEvent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountingEvent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
