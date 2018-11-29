/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcolarAdminTestModule } from '../../../test.module';
import { MovementLineDetailComponent } from 'app/entities/movement-line/movement-line-detail.component';
import { MovementLine } from 'app/shared/model/movement-line.model';

describe('Component Tests', () => {
    describe('MovementLine Management Detail Component', () => {
        let comp: MovementLineDetailComponent;
        let fixture: ComponentFixture<MovementLineDetailComponent>;
        const route = ({ data: of({ movementLine: new MovementLine('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [MovementLineDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MovementLineDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MovementLineDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.movementLine).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
