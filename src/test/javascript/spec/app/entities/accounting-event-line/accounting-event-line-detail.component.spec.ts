/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcolarTestModule } from '../../../test.module';
import { AccountingEventLineDetailComponent } from 'app/entities/accounting-event-line/accounting-event-line-detail.component';
import { AccountingEventLine } from 'app/shared/model/accounting-event-line.model';

describe('Component Tests', () => {
    describe('AccountingEventLine Management Detail Component', () => {
        let comp: AccountingEventLineDetailComponent;
        let fixture: ComponentFixture<AccountingEventLineDetailComponent>;
        const route = ({ data: of({ accountingEventLine: new AccountingEventLine('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountingEventLineDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccountingEventLineDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountingEventLineDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.accountingEventLine).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
