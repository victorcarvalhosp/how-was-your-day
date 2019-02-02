import { Action } from '@ngrx/store';
import {IAuthentication} from '../models/authentication';
import UserCredential = firebase.auth.UserCredential;

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Success = '[Auth] Success',
  Failed = '[Auth] Failed',
  Required = '[Auth] Required',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  // Demonstrate authentication data is defined in a model(interface)
  // However, any supported objects can be used here, such as a "string"
  constructor(public payload: IAuthentication) {}
}


export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.Success;

  // The username will be given as a string
  // In real scenario, it should be a model as well
  constructor(public payload: UserCredential) {}
}

export class LoginFailed implements Action {
  readonly type = AuthActionTypes.Failed;
  // Failed login, we can use it to do some record or error msg showing
  constructor(public payload: string) {}
}

export class LoginRequired implements Action {
  readonly type = AuthActionTypes.Required;
  // The action can be without constructor as well
}


export type AuthActions =
    | Login
    | LoginSuccess
    | LoginFailed
    | LoginRequired
