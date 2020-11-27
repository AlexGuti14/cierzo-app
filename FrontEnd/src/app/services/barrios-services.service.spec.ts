import { TestBed } from '@angular/core/testing';

import { BarriosService } from './barrios-services.service';

describe('BarriosServicesService', () => {
  let service: BarriosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarriosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
