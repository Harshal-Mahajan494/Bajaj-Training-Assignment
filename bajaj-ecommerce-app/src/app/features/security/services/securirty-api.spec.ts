import { TestBed } from '@angular/core/testing';

import { SecurirtyApi } from './securirty-api';

describe('SecurirtyApi', () => {
  let service: SecurirtyApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurirtyApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
