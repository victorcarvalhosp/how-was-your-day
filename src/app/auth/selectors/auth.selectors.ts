import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from '../reducers/auth.reducer';


export const selectAuthState = createFeatureSelector<AuthState>('auth');


export const isLoginLoading = createSelector(
    selectAuthState,
    authState => authState.loading
);

export const getLoggedUser = createSelector(
    selectAuthState,
    authState => authState.userCredentials
);

export const getLoggedUserUid = createSelector(
    getLoggedUser,
    user => user.uid
);

export const isLoggedIn = createSelector(
    selectAuthState,
    authState => authState.authenticated
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);

export const loginErrorMessage = createSelector(
    selectAuthState,
    authState => authState.errorMessage
);
