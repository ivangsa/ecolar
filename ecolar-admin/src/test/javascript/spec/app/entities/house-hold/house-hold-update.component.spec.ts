/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EcolarTestModule } from '../../../test.module';
import { HouseHoldUpdateComponent } from 'app/entities/house-hold/house-hold-update.component';
import { HouseHoldService } from 'app/entities/house-hold/house-hold.service';
import { HouseHold } from 'app/shared/model/house-hold.model';

describe('Component Tests', () => {
    describe('HouseHold Management Update Component', () => {
        let comp: HouseHoldUpdateComponent;
        let fixture: ComponentFixture<HouseHoldUpdateComponent>;
        let service: HouseHoldService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarTestModule],
                declarations: [HouseHoldUpdateComponent]
            })
                .overrideTemplate(HouseHoldUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HouseHoldUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseHoldService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new HouseHold('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.houseHold = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new HouseHold();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.houseHold = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
