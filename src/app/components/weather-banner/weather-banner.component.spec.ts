import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherBannerComponent } from './weather-banner.component';

describe('WeatherBannerComponent', () => {
  let component: WeatherBannerComponent;
  let fixture: ComponentFixture<WeatherBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
