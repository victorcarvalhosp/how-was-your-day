import {AuthActions, AuthActionTypes} from '../actions/auth.actions';
import {IUser} from '../models/user';


// Here is the final state required by the app
export interface AuthState {
    authenticated: boolean;
    // Name is what we passed in "Actions" as payload, thus it can be a model if needed
    userCredentials: IUser;
    errorMessage: string;
    loading: boolean;
}

// Here is the initial state set if no changes happened
export const initialAuthState: AuthState = {
    authenticated: false,
    userCredentials: null,
    errorMessage: '',
    loading: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
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
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                authenticated: false,
                loading: false,
                userCredentials: null,
                errorMessage: '',
            };
        default:
            return state;
    }
}

