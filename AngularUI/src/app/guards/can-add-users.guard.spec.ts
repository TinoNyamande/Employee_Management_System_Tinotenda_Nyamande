import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canAddUsersGuard } from './can-add-users.guard';

describe('canAddUsersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAddUsersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
