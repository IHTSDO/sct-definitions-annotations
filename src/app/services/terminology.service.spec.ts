import { TestBed } from '@angular/core/testing';

import { TerminologyService } from './terminology.service';

describe('TerminologyService', () => {
  let service: TerminologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
