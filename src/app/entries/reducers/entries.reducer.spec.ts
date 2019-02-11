import { entriesReducer, initialActivitiesState } from './entries.reducer';

describe('Activities Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = entriesReducer(initialActivitiesState, action);

      expect(result).toBe(initialActivitiesState);
    });
  });
});
