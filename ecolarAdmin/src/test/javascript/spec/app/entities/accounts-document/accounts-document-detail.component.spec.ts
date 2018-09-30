/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcolarAdminTestModule } from '../../../test.module';
import { AccountsDocumentDetailComponent } from 'app/entities/accounts-document/accounts-document-detail.component';
import { AccountsDocument } from 'app/shared/model/accounts-document.model';

describe('Component Tests', () => {
    describe('AccountsDocument Management Detail Component', () => {
        let comp: AccountsDocumentDetailComponent;
        let fixture: ComponentFixture<AccountsDocumentDetailComponent>;
        const route = ({ data: of({ accountsDocument: new AccountsDocument('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [AccountsDocumentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccountsDocumentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountsDocumentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.accountsDocument).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
