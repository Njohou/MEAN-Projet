import { TestBed } from '@angular/core/testing';

import { ReserveTicketService } from './reserve-ticket.service';

describe('ReserveTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReserveTicketService = TestBed.get(ReserveTicketService);
    expect(service).toBeTruthy();
  });
});
