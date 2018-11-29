/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcolarTestModule } from '../../../test.module';
import { EAccountComponent } from 'app/entities/e-account/e-account.component';
import { EAccountService } from 'app/entities/e-account/e-account.service';
import { EAccount } from 'app/shared/model/e-account.model';

describe('Component Tests', () => {
    describe('EAccount Management Component', () => {
        let comp: EAccountComponent;
        let fixture: ComponentFixture<EAccountComponent>;
        let service: EAccountService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [EAccountComponent],
                providers: []
            })
                .overrideTemplate(EAccountComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EAccountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EAccountService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EAccount('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.eAccounts[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
