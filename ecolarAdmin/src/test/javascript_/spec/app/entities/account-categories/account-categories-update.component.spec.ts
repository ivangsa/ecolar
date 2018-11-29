/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EcolarAdminTestModule } from '../../../test.module';
import { AccountCategoriesUpdateComponent } from 'app/entities/account-categories/account-categories-update.component';
import { AccountCategoriesService } from 'app/entities/account-categories/account-categories.service';
import { AccountCategories } from 'app/shared/model/account-categories.model';

describe('Component Tests', () => {
    describe('AccountCategories Management Update Component', () => {
        let comp: AccountCategoriesUpdateComponent;
        let fixture: ComponentFixture<AccountCategoriesUpdateComponent>;
        let service: AccountCategoriesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [AccountCategoriesUpdateComponent]
            })
                .overrideTemplate(AccountCategoriesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountCategoriesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountCategoriesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountCategories('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountCategories = entity;
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
                    const entity = new AccountCategories();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountCategories = entity;
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
