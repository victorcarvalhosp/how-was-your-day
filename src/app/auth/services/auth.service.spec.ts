import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularAuthMock} from '../../shared/tests/mocks';

describe('AuthService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [{provide: AngularFireAuth, useValue: AngularAuthMock},
        ]
    }));

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
