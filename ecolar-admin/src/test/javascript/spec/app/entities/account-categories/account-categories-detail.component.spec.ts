/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcolarTestModule } from '../../../test.module';
import { AccountCategoriesDetailComponent } from 'app/entities/account-categories/account-categories-detail.component';
import { AccountCategories } from 'app/shared/model/account-categories.model';

describe('Component Tests', () => {
    describe('AccountCategories Management Detail Component', () => {
        let comp: AccountCategoriesDetailComponent;
        let fixture: ComponentFixture<AccountCategoriesDetailComponent>;
        const route = ({ data: of({ accountCategories: new AccountCategories('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountCategoriesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccountCategoriesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountCategoriesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.accountCategories).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
