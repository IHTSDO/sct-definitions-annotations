import { TestBed } from '@angular/core/testing';

import { CodingSpecService } from './coding-spec.service';

describe('CodingSpecService', () => {
  let service: CodingSpecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodingSpecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
