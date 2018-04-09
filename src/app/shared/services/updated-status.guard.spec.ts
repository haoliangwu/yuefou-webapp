import { TestBed, async, inject } from '@angular/core/testing';

import { UpdatedStatusGuard } from './updated-status.guard';

describe('UpdatedStatusGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatedStatusGuard]
    });
  });

  it('should ...', inject([UpdatedStatusGuard], (guard: UpdatedStatusGuard) => {
    expect(guard).toBeTruthy();
  }));
});
