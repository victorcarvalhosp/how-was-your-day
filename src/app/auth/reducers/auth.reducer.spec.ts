import { authReducer, initialAuthState } from './auth.reducer';
import {AuthActions, AuthActionTypes, Login} from '../actions/auth.actions';
import * as authReducer from './auth.reducer';



describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = authReducer(initialAuthState, action);

      expect(result).toBe(initialAuthState);
    });
  });


  describe('LOGIN action', () => {
    it('should set loadingList to true and hide error messages', () => {
      const action = new Login({identifier: 'test'});
      const state = authReducer.authReducer(initialAuthState, action);

      expect(state.loading).toEqual(true);
      expect(state.errorMessage).toEqual('');
      expect(state.authenticated).toEqual(false);
    });
  });
});
