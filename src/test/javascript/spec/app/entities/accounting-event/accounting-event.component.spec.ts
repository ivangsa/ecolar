/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcolarTestModule } from '../../../test.module';
import { AccountingEventComponent } from 'app/entities/accounting-event/accounting-event.component';
import { AccountingEventService } from 'app/entities/accounting-event/accounting-event.service';
import { AccountingEvent } from 'app/shared/model/accounting-event.model';

describe('Component Tests', () => {
    describe('AccountingEvent Management Component', () => {
        let comp: AccountingEventComponent;
        let fixture: ComponentFixture<AccountingEventComponent>;
        let service: AccountingEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountingEventComponent],
                providers: []
            })
                .overrideTemplate(AccountingEventComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountingEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountingEventService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AccountingEvent('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accountingEvents[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
