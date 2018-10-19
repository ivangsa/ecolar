/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcolarAdminTestModule } from '../../../test.module';
import { UserPreferencesComponent } from 'app/entities/user-preferences/user-preferences.component';
import { UserPreferencesService } from 'app/entities/user-preferences/user-preferences.service';
import { UserPreferences } from 'app/shared/model/user-preferences.model';

describe('Component Tests', () => {
    describe('UserPreferences Management Component', () => {
        let comp: UserPreferencesComponent;
        let fixture: ComponentFixture<UserPreferencesComponent>;
        let service: UserPreferencesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EcolarAdminTestModule],
                declarations: [UserPreferencesComponent],
                providers: []
            })
                .overrideTemplate(UserPreferencesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserPreferencesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPreferencesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserPreferences('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userPreferences[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
