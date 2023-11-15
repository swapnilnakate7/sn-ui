import { TestBed } from '@angular/core/testing';

import { SnCardService } from './sn-card.service';

describe('SnCardService', () => {
  let service: SnCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
