/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcolarAdminTestModule } from '../../../test.module';
import { AccountsDocumentComponent } from 'app/entities/accounts-document/accounts-document.component';
import { AccountsDocumentService } from 'app/entities/accounts-document/accounts-document.service';
import { AccountsDocument } from 'app/shared/model/accounts-document.model';

describe('Component Tests', () => {
    describe('AccountsDocument Management Component', () => {
        let comp: AccountsDocumentComponent;
        let fixture: ComponentFixture<AccountsDocumentComponent>;
        let service: AccountsDocumentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [AccountsDocumentComponent],
                providers: []
            })
                .overrideTemplate(AccountsDocumentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountsDocumentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsDocumentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AccountsDocument('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accountsDocuments[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
