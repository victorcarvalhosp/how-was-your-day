import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MoodsEffects } from './moods.effects';

describe('EntriesEffects', () => {
  let actions$: Observable<any>;
  let effects: MoodsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoodsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MoodsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
