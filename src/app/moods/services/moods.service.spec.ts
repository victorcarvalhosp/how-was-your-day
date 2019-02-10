import { TestBed } from '@angular/core/testing';

import { MoodsService } from './moods.service';

describe('MoodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoodsService = TestBed.get(MoodsService);
    expect(service).toBeTruthy();
  });
});
