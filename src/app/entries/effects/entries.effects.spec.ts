import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EntriesEffects } from './entries.effects';

describe('EntriesEffects', () => {
  let actions$: Observable<any>;
  let effects: EntriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EntriesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(EntriesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
