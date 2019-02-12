import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {PeriodEffects} from './period.effects';

describe('PeriodEffects', () => {
  let actions$: Observable<any>;
  let effects: PeriodEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PeriodEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PeriodEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
