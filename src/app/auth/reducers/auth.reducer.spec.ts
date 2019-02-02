import { reducer, initialState } from './auth.reducer';
import {AuthActions, AuthActionTypes, Login} from '../actions/auth.actions';
import * as authReducer from './auth.reducer';



describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });


  describe('LOGIN action', () => {
    it('should set loading to true and hide error messages', () => {
      const action = new Login({identifier: 'test'});
      const state = authReducer.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.errorMessage).toEqual('');
      expect(state.authenticated).toEqual(false);
    });
  });
});
