import { TestBed, inject } from '@angular/core/testing';

import { FormUtilService } from './form-util.service';

describe('FormUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormUtilService]
    });
  });

  it('should be created', inject([FormUtilService], (service: FormUtilService) => {
    expect(service).toBeTruthy();
  }));
});
