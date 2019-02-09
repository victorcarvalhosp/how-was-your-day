import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {getLoggedUser, selectAuthState} from '../../auth/selectors/auth.selectors';
import {GetLoggedUser} from '../../auth/actions/auth.actions';
import {ROUTE_AUTH, ROUTE_TAB1} from '../router/routes.constants';
import {AuthState} from '../../auth/reducers/auth.reducer';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        private store: Store<AuthState>
    ) {
    }

    getFromStoreOrAPI(): Observable<any> {
        return this.store.select(selectAuthState).pipe(
            tap(authState => {
                if (!authState || !authState.userCredentials) {
                    this.store.dispatch(new GetLoggedUser());
                }
            }), filter(data => {
                return data !== undefined && data.userCredentials !== null;
            }),
            take(1));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.getFromStoreOrAPI().pipe(
            switchMap(() => {
                return of(true);
            })
            , catchError(() => {
                this.router.navigate([ROUTE_AUTH]);
                return of(false);
            })
        );
    }

}
