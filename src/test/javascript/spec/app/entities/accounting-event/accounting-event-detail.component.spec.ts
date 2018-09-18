/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcolarTestModule } from '../../../test.module';
import { AccountingEventDetailComponent } from 'app/entities/accounting-event/accounting-event-detail.component';
import { AccountingEvent } from 'app/shared/model/accounting-event.model';

describe('Component Tests', () => {
    describe('AccountingEvent Management Detail Component', () => {
        let comp: AccountingEventDetailComponent;
        let fixture: ComponentFixture<AccountingEventDetailComponent>;
        const route = ({ data: of({ accountingEvent: new AccountingEvent('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountingEventDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccountingEventDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountingEventDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.accountingEvent).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
