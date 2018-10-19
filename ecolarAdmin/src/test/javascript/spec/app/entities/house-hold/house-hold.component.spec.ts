/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcolarAdminTestModule } from '../../../test.module';
import { HouseHoldComponent } from 'app/entities/house-hold/house-hold.component';
import { HouseHoldService } from 'app/entities/house-hold/house-hold.service';
import { HouseHold } from 'app/shared/model/house-hold.model';

describe('Component Tests', () => {
    describe('HouseHold Management Component', () => {
        let comp: HouseHoldComponent;
        let fixture: ComponentFixture<HouseHoldComponent>;
        let service: HouseHoldService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [HouseHoldComponent],
                providers: []
            })
                .overrideTemplate(HouseHoldComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HouseHoldComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseHoldService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HouseHold('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.houseHolds[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
