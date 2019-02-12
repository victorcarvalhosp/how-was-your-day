import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {routerReducer} from '@ngrx/router-store';
import * as authReducers from '../auth/reducers/auth.reducer';
import {AuthState} from '../auth/reducers/auth.reducer';
import { storeFreeze } from 'ngrx-store-freeze';



export interface AppState {
  auth: AuthState;
}

export function defaultReducer<T>(state: T) { return state; }
export const initialReducerMap = {
  auth: defaultReducer,
  router: routerReducer
} as ActionReducerMap<AppState>;

export function getInitialState() {
  return {
    auth: authReducers.initialAuthState,
  } as AppState;
}

//
//
//
//
//
//
//
//
// export const reducers: ActionReducerMap<AppState> = {
//   router: routerReducer
// };

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
