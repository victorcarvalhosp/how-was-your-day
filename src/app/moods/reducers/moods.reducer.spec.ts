import { moodsReducer, initialActivitiesState } from './moods.reducer';

describe('Activities Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = moodsReducer(initialActivitiesState, action);

      expect(result).toBe(initialActivitiesState);
    });
  });
});
