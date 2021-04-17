import { TestBed } from '@angular/core/testing';

import { SommeilUserService } from './sommeil-user.service';

describe('SommeilUserService', () => {
  let service: SommeilUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SommeilUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
