import { periodReducer, initialPeriodState } from './period.reducer';

describe('Period Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = periodReducer(initialPeriodState, action);

      expect(result).toBe(initialPeriodState);
    });
  });
});
