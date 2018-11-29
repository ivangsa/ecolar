/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EcolarAdminTestModule } from '../../../test.module';
import { MovementLineUpdateComponent } from 'app/entities/movement-line/movement-line-update.component';
import { MovementLineService } from 'app/entities/movement-line/movement-line.service';
import { MovementLine } from 'app/shared/model/movement-line.model';

describe('Component Tests', () => {
    describe('MovementLine Management Update Component', () => {
        let comp: MovementLineUpdateComponent;
        let fixture: ComponentFixture<MovementLineUpdateComponent>;
        let service: MovementLineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [MovementLineUpdateComponent]
            })
                .overrideTemplate(MovementLineUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MovementLineUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovementLineService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MovementLine('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.movementLine = entity;
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
                    const entity = new MovementLine();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.movementLine = entity;
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
