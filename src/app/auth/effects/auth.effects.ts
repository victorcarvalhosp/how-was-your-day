import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {tap, map, exhaustMap, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {AuthActionTypes, GetLoggedUser, Login, LoginFailed, LoginSuccess, Signup, SignupFailed} from '../actions/auth.actions';
import {IAuthentication} from '../models/authentication';
import {AuthService} from '../services/auth.service';
import {IUser} from '../models/user';
import {ROUTE_AUTH, ROUTE_TAB1} from '../../shared/router/routes.constants';


@Injectable()
export class AuthEffects {

    @Effect()
        // Once it detects such signal (it's a string as we defined in "Action")
        // It will call
    login$ = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: Login) => action.payload),
        // Use `exhaustMap` to wait for Observable respond
        exhaustMap((auth: IAuthentication) =>
            this.authService
                .login(auth)
                .pipe(
                    map(userCredential => {
                        localStorage.setItem('token', userCredential.uid);
                        return new LoginSuccess(userCredential);
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(new LoginFailed(error.message));
                    })
                )
        )
    );


    @Effect()
    getLoggedUser$ = this.actions$.pipe(
        ofType(AuthActionTypes.GET_LOGGED_USER),
        exhaustMap(() =>
            this.authService
                .getLoggedInUser()
                .pipe(
                    map(userCredential => {
                        console.log('SIDE EFFECT');
                        localStorage.setItem('token', userCredential.uid);
                        return new LoginSuccess(userCredential);
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(new LoginFailed(error.message));
                    })
                )
        )
    );

    @Effect()
    signup$ = this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP),
        map((action: Signup) => action.payload),
        // Use `exhaustMap` to wait for Observable respond
        exhaustMap((auth: IAuthentication) =>
            this.authService
                .register(auth)
                .pipe(
                    map(userCredential => {
                        return new Login(auth);
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(new SignupFailed(error.message));
                    })
                )
        )
    );

    @Effect({dispatch: false})
        // If the user is logged in, let it goes to "Team App"
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_SUCESS),
        tap(() => this.router.navigate([ROUTE_TAB1]))
    );

    @Effect({dispatch: false})
        // Probably the user enter some routes directly, and we require it to login
        // As for permission, we can do the same thing to redirect it to somewhere for requesting the permissions
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_REQUIRED),
        tap(() => {
            this.router.navigate([ROUTE_AUTH]);
        })
    );

    constructor(private router: Router,
                private actions$: Actions,
                private authService: AuthService
    ) {
    }

}
