import { TestBed } from '@angular/core/testing';

import { CovoitureService } from './covoiture.service';

describe('CovoitureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovoitureService = TestBed.get(CovoitureService);
    expect(service).toBeTruthy();
  });
});
