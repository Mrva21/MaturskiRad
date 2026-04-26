import { TestBed } from '@angular/core/testing';

import { Korisnici } from './korisnici';

describe('Korisnici', () => {
  let service: Korisnici;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Korisnici);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
