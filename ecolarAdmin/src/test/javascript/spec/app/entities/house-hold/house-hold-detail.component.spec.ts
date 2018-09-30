/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcolarAdminTestModule } from '../../../test.module';
import { HouseHoldDetailComponent } from 'app/entities/house-hold/house-hold-detail.component';
import { HouseHold } from 'app/shared/model/house-hold.model';

describe('Component Tests', () => {
    describe('HouseHold Management Detail Component', () => {
        let comp: HouseHoldDetailComponent;
        let fixture: ComponentFixture<HouseHoldDetailComponent>;
        const route = ({ data: of({ houseHold: new HouseHold('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [HouseHoldDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HouseHoldDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HouseHoldDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.houseHold).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
