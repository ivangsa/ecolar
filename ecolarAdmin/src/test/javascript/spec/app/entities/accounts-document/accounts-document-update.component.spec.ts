/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EcolarAdminTestModule } from '../../../test.module';
import { AccountsDocumentUpdateComponent } from 'app/entities/accounts-document/accounts-document-update.component';
import { AccountsDocumentService } from 'app/entities/accounts-document/accounts-document.service';
import { AccountsDocument } from 'app/shared/model/accounts-document.model';

describe('Component Tests', () => {
    describe('AccountsDocument Management Update Component', () => {
        let comp: AccountsDocumentUpdateComponent;
        let fixture: ComponentFixture<AccountsDocumentUpdateComponent>;
        let service: AccountsDocumentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [AccountsDocumentUpdateComponent]
            })
                .overrideTemplate(AccountsDocumentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountsDocumentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsDocumentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountsDocument('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountsDocument = entity;
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
                    const entity = new AccountsDocument();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountsDocument = entity;
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
