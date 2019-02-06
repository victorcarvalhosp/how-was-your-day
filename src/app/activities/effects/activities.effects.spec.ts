import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActivitiesEffects } from './activities.effects';

describe('ActivitiesEffects', () => {
  let actions$: Observable<any>;
  let effects: ActivitiesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivitiesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ActivitiesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
