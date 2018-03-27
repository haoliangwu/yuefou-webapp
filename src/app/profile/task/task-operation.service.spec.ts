import { TestBed, inject } from '@angular/core/testing';

import { TaskOperationService } from './task-operation.service';

describe('TaskOperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskOperationService]
    });
  });

  it('should be created', inject([TaskOperationService], (service: TaskOperationService) => {
    expect(service).toBeTruthy();
  }));
});
