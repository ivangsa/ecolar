/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EcolarAdminTestModule } from '../../../test.module';
import { EAccountUpdateComponent } from 'app/entities/e-account/e-account-update.component';
import { EAccountService } from 'app/entities/e-account/e-account.service';
import { EAccount } from 'app/shared/model/e-account.model';

describe('Component Tests', () => {
    describe('EAccount Management Update Component', () => {
        let comp: EAccountUpdateComponent;
        let fixture: ComponentFixture<EAccountUpdateComponent>;
        let service: EAccountService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [EAccountUpdateComponent]
            })
                .overrideTemplate(EAccountUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EAccountUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EAccountService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EAccount('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.eAccount = entity;
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
                    const entity = new EAccount();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.eAccount = entity;
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
