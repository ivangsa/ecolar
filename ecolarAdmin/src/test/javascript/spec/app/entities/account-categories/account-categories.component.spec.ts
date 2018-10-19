/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcolarAdminTestModule } from '../../../test.module';
import { AccountCategoriesComponent } from 'app/entities/account-categories/account-categories.component';
import { AccountCategoriesService } from 'app/entities/account-categories/account-categories.service';
import { AccountCategories } from 'app/shared/model/account-categories.model';

describe('Component Tests', () => {
    describe('AccountCategories Management Component', () => {
        let comp: AccountCategoriesComponent;
        let fixture: ComponentFixture<AccountCategoriesComponent>;
        let service: AccountCategoriesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [AccountCategoriesComponent],
                providers: []
            })
                .overrideTemplate(AccountCategoriesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountCategoriesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountCategoriesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AccountCategories('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accountCategories[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
