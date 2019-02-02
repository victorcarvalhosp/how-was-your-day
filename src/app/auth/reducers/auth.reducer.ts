import {ActionReducer, Action} from '@ngrx/store';
import {AuthActions, AuthActionTypes} from '../actions/auth.actions';


// Here is the final state required by the app
export interface AuthState {
    isAuthenticated: boolean;
    // Name is what we passed in "Actions" as payload, thus it can be a model if needed
    userName: string | '';
    // This is used for showing usage when login is failed
    attemptLoginFailed: boolean;
}

// Here is the initial state set if no changes happened
export const initialState: AuthState = {
    isAuthenticated: false,
    userName: '',
    attemptLoginFailed: false
};

export function reducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        // Case can be more complex
        // "Login" is not put since it's not used for representing a status (AuthState)
        case AuthActionTypes.Success:
            return {
                isAuthenticated: true,
                // The username is retrieved from the "Action"
                // In production, user data should be defined as a model
                // Retrieving user data like, `user: action.payload.user <- a model`
                userName: action.payload,
                attemptLoginFailed: false,
            };
        case AuthActionTypes.Failed:
            return {
                isAuthenticated: false,
                userName: '',
                attemptLoginFailed: true,
            };
        default:
            return state;
    }
}

// Use "Const" for getting read-only data managed by current "Reducer"
export const isAuthenticated = (state: AuthState) => state.isAuthenticated;
export const getUserName = (state: AuthState) => state.userName;
export const isRisky = (state: AuthState) => state.attemptLoginFailed;
