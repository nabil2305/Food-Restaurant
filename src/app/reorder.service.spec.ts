import { TestBed, inject } from '@angular/core/testing';

import { ReorderService } from './reorder.service';

describe('ReorderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReorderService]
    });
  });

  it('should be created', inject([ReorderService], (service: ReorderService) => {
    expect(service).toBeTruthy();
  }));
});
