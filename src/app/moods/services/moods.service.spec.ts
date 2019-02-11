import { TestBed } from '@angular/core/testing';

import { MoodsService } from './moods.service';

describe('EntriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoodsService = TestBed.get(MoodsService);
    expect(service).toBeTruthy();
  });
});
