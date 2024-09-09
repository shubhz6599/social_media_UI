import { TestBed } from '@angular/core/testing';

import { OnlinePeopleService } from './online-people.service';

describe('OnlinePeopleService', () => {
  let service: OnlinePeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlinePeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
