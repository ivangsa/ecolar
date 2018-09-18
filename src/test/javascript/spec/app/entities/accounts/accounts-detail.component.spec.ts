/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcolarTestModule } from '../../../test.module';
import { AccountsDetailComponent } from 'app/entities/accounts/accounts-detail.component';
import { Accounts } from 'app/shared/model/accounts.model';

describe('Component Tests', () => {
    describe('Accounts Management Detail Component', () => {
        let comp: AccountsDetailComponent;
        let fixture: ComponentFixture<AccountsDetailComponent>;
        const route = ({ data: of({ accounts: new Accounts('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccountsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.accounts).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
