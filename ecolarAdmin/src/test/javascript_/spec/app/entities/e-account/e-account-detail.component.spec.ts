/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcolarAdminTestModule } from '../../../test.module';
import { EAccountDetailComponent } from 'app/entities/e-account/e-account-detail.component';
import { EAccount } from 'app/shared/model/e-account.model';

describe('Component Tests', () => {
    describe('EAccount Management Detail Component', () => {
        let comp: EAccountDetailComponent;
        let fixture: ComponentFixture<EAccountDetailComponent>;
        const route = ({ data: of({ eAccount: new EAccount('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [EAccountDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EAccountDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EAccountDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.eAccount).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
