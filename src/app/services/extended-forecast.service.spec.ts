import { TestBed } from '@angular/core/testing';

import { ExtendedForecastService } from './extended-forecast.service';

describe('ExtendedForecastService', () => {
  let service: ExtendedForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendedForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
