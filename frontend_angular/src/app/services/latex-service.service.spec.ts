import { TestBed } from '@angular/core/testing';

import { LatexServiceService } from './latex-service.service';

describe('LatexServiceService', () => {
  let service: LatexServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatexServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
