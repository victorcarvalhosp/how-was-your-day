import {Action} from '@ngrx/store';
import {IAuthentication} from '../models/authentication';
import UserCredential = firebase.auth.UserCredential;
import {IUser} from '../models/user';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCESS = '[Auth] Login Success',
    LOGIN_FAILED = '[Auth] Login Failed',
    LOGIN_REQUIRED = '[Auth] Login Required',
    SIGNUP = '[Auth] Signup',
    SIGNUP_FAILED = '[Auth] Signup Failed',
    GET_LOGGED_USER = '[Auth] Get Logged User',
    LOGOUT = '[Auth] Logout',

}

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;

    // Demonstrate authentication data is defined in a model(interface)
    // However, any supported objects can be used here, such as a "string"
    constructor(public payload: IAuthentication) {
    }
}


export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCESS;

    // The username will be given as a string
    // In real scenario, it should be a model as well
    constructor(public payload: IUser) {
    }
}

export class LoginFailed implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILED;

    // LOGIN_FAILED login, we can use it to do some record or error msg showing
    constructor(public payload: string) {
    }
}

export class LoginRequired implements Action {
    readonly type = AuthActionTypes.LOGIN_REQUIRED;
    // The action can be without constructor as well
}

export class Signup implements Action {
    readonly type = AuthActionTypes.SIGNUP;

    constructor(public payload: IAuthentication) {
    }
}

export class SignupFailed implements Action {
    readonly type = AuthActionTypes.SIGNUP_FAILED;

    constructor(public payload: string) {
    }
}

export class GetLoggedUser implements Action {
    readonly type = AuthActionTypes.GET_LOGGED_USER;
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions =
    | Login
    | LoginSuccess
    | LoginFailed
    | LoginRequired
    | Signup
    | SignupFailed
    | GetLoggedUser
    | Logout
