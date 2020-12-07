import { TestBed, inject } from '@angular/core/testing';

import { TotalcartvalueService } from './totalcartvalue.service';

describe('TotalcartvalueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TotalcartvalueService]
    });
  });

  it('should be created', inject([TotalcartvalueService], (service: TotalcartvalueService) => {
    expect(service).toBeTruthy();
  }));
});
