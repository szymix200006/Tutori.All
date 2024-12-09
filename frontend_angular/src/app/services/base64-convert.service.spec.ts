import { TestBed } from '@angular/core/testing';

import { Base64ConvertService } from './base64-convert.service';

describe('Base64ConvertService', () => {
  let service: Base64ConvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64ConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
