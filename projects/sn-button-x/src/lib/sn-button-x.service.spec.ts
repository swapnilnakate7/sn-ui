import { TestBed } from '@angular/core/testing';

import { SnButtonService } from './sn-button-x.service';

describe('SnButtonService', () => {
  let service: SnButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
