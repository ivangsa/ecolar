/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcolarTestModule } from '../../../test.module';
import { AccountsComponent } from 'app/entities/accounts/accounts.component';
import { AccountsService } from 'app/entities/accounts/accounts.service';
import { Accounts } from 'app/shared/model/accounts.model';

describe('Component Tests', () => {
    describe('Accounts Management Component', () => {
        let comp: AccountsComponent;
        let fixture: ComponentFixture<AccountsComponent>;
        let service: AccountsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [AccountsComponent],
                providers: []
            })
                .overrideTemplate(AccountsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Accounts('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accounts[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
