import { TestBed, inject } from '@angular/core/testing';

import { RamdaUtilService } from './ramda-util.service';

describe('RamdaUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RamdaUtilService]
    });
  });

  it('should be created', inject([RamdaUtilService], (service: RamdaUtilService) => {
    expect(service).toBeTruthy();
  }));
});
