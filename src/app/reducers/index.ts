import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {routerReducer} from '@ngrx/router-store';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
