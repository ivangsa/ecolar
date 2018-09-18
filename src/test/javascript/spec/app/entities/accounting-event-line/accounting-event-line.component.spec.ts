/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcolarTestModule } from '../../../test.module';
import { AccountingEventLineComponent } from 'app/entities/accounting-event-line/accounting-event-line.component';
import { AccountingEventLineService } from 'app/entities/accounting-event-line/accounting-event-line.service';
import { AccountingEventLine } from 'app/shared/model/accounting-event-line.model';

describe('Component Tests', () => {
    describe('AccountingEventLine Management Component', () => {
        let comp: AccountingEventLineComponent;
        let fixture: ComponentFixture<AccountingEventLineComponent>;
        let service: AccountingEventLineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountingEventLineComponent],
                providers: []
            })
                .overrideTemplate(AccountingEventLineComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountingEventLineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountingEventLineService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AccountingEventLine('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accountingEventLines[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
