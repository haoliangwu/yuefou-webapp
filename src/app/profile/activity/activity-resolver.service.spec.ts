import { TestBed, inject } from '@angular/core/testing';

import { ActivityResolverService } from './activity-resolver.service';

describe('ActivityResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityResolverService]
    });
  });

  it('should be created', inject([ActivityResolverService], (service: ActivityResolverService) => {
    expect(service).toBeTruthy();
  }));
});
