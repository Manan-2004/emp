import { TestBed } from '@angular/core/testing';

import { MessagesServices } from './messages-services';

describe('MessagesServices', () => {
  let service: MessagesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
