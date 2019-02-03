import {AuthActions, AuthActionTypes} from '../actions/auth.actions';
import UserCredential = firebase.auth.UserCredential;


// Here is the final state required by the app
export interface AuthState {
    authenticated: boolean;
    // Name is what we passed in "Actions" as payload, thus it can be a model if needed
    userCredentials: UserCredential;
    errorMessage: string;
    loading: boolean;
}

// Here is the initial state set if no changes happened
export const initialState: AuthState = {
    authenticated: false,
    userCredentials: null,
    errorMessage: '',
    loading: false
};

export function reducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                ...state,
                authenticated: false,
                loading: true,
                errorMessage: '',
            };
        case AuthActionTypes.LOGIN_SUCESS:
            return {
                ...state,
                authenticated: true,
                loading: false,
                userCredentials: action.payload,
                errorMessage: '',
            };
        case AuthActionTypes.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                authenticated: false,
                userCredentials: null,
                errorMessage: action.payload,
            };
        case AuthActionTypes.SIGNUP:
            return {
                ...state,
                authenticated: false,
                loading: true,
                errorMessage: '',
            };
        case AuthActionTypes.SIGNUP_FAILED:
            return {
                ...state,
                loading: false,
                authenticated: false,
                userCredentials: null,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
}

