/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcolarAdminTestModule } from '../../../test.module';
import { MovementLineComponent } from 'app/entities/movement-line/movement-line.component';
import { MovementLineService } from 'app/entities/movement-line/movement-line.service';
import { MovementLine } from 'app/shared/model/movement-line.model';

describe('Component Tests', () => {
    describe('MovementLine Management Component', () => {
        let comp: MovementLineComponent;
        let fixture: ComponentFixture<MovementLineComponent>;
        let service: MovementLineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [MovementLineComponent],
                providers: []
            })
                .overrideTemplate(MovementLineComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MovementLineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovementLineService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MovementLine('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.movementLines[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
