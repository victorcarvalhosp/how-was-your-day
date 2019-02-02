import {ActionReducer, Action} from '@ngrx/store';
import {AuthActions, AuthActionTypes} from '../actions/auth.actions';
import UserCredential = firebase.auth.UserCredential;


// Here is the final state required by the app
export interface AuthState {
    isAuthenticated: boolean;
    // Name is what we passed in "Actions" as payload, thus it can be a model if needed
    userCredentials: UserCredential;
    errorMessage: string;
    isLoading: boolean;
}

// Here is the initial state set if no changes happened
export const initialState: AuthState = {
    isAuthenticated: false,
    userCredentials: null,
    errorMessage: '',
    isLoading: false
};

export function reducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        // Case can be more complex
        // "Login" is not put since it's not used for representing a status (AuthState)
        case AuthActionTypes.Login:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: true,
                errorMessage: '',
            };
        case AuthActionTypes.Success:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                userCredentials: action.payload,
                errorMessage: '',
            };
        case AuthActionTypes.Failed:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                userCredentials: null,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
}

