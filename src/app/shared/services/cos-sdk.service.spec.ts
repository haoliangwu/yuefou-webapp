import { TestBed, inject } from '@angular/core/testing';

import { CosSdkService } from './cos-sdk.service';

describe('CosSdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CosSdkService]
    });
  });

  it('should be created', inject([CosSdkService], (service: CosSdkService) => {
    expect(service).toBeTruthy();
  }));
});
