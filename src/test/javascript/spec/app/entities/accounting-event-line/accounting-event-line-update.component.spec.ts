/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EcolarTestModule } from '../../../test.module';
import { AccountingEventLineUpdateComponent } from 'app/entities/accounting-event-line/accounting-event-line-update.component';
import { AccountingEventLineService } from 'app/entities/accounting-event-line/accounting-event-line.service';
import { AccountingEventLine } from 'app/shared/model/accounting-event-line.model';

describe('Component Tests', () => {
    describe('AccountingEventLine Management Update Component', () => {
        let comp: AccountingEventLineUpdateComponent;
        let fixture: ComponentFixture<AccountingEventLineUpdateComponent>;
        let service: AccountingEventLineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountingEventLineUpdateComponent]
            })
                .overrideTemplate(AccountingEventLineUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountingEventLineUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountingEventLineService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountingEventLine('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountingEventLine = entity;
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
                    const entity = new AccountingEventLine();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountingEventLine = entity;
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
