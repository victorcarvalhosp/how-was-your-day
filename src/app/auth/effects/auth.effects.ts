import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {tap, map, exhaustMap, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {AuthActionTypes, Login, LoginFailed, LoginSuccess} from '../actions/auth.actions';
import {IAuthentication} from '../models/authentication';
import {AuthService} from '../services/auth.service';


@Injectable()
export class AuthEffects {

    @Effect()
        // Once it detects such signal (it's a string as we defined in "Action")
        // It will call
    login$ = this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        map((action: Login) => action.payload),
        // Use `exhaustMap` to wait for Observable respond
        exhaustMap((auth: IAuthentication) =>
            this.authService
                .login(auth)
                .pipe(
                    map(userCredential => new LoginSuccess(userCredential)),
                    catchError(error => {
                        console.log(error);
                        return of(new LoginFailed(error.message));
                    })
                )
        )
    );

    @Effect({dispatch: false})
        // If the user is logged in, let it goes to "Team App"
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.Success),
        tap(() => this.router.navigate(['']))
    );

    @Effect({dispatch: false})
        // Probably the user enter some routes directly, and we require it to login
        // As for permission, we can do the same thing to redirect it to somewhere for requesting the permissions
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthActionTypes.Required),
        tap(() => {
            this.router.navigate(['/auth']);
        })
    );

    constructor(private router: Router,
                private actions$: Actions,
                private authService: AuthService
    ) {
    }

}
