import { TestBed } from '@angular/core/testing';

import { SnInputService } from './sn-input.service';

describe('SnInputService', () => {
  let service: SnInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
