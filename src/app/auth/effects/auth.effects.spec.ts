import {TestBed, inject} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {AuthEffects} from './auth.effects';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularAuthMock} from '../../shared/tests/mocks';


describe('AuthEffects', () => {
    let actions$: Observable<any>;
    let effects: AuthEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                AuthEffects,
                { provide: AngularFireAuth, useValue: AngularAuthMock },
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(AuthEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
