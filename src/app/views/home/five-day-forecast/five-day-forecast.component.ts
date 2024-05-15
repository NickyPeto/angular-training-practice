import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ExtendedForecastService } from '../../../services/extended-forecast.service';
import { ActivatedRoute } from '@angular/router';
import { ExtendedForecastType } from '../../../models/types';
import { CommonModule } from '@angular/common';
import { UnixTimestampToDatePipe } from '../../../pipes/unix-timestamp-to-date.pipe';
import { WeatherBannerComponent } from '../../../components/weather-banner/weather-banner.component';

@Component({
  selector: 'app-five-day-forecast',
  standalone: true,
  imports: [CommonModule, UnixTimestampToDatePipe, WeatherBannerComponent],
  templateUrl: './five-day-forecast.component.html',
  styleUrl: './five-day-forecast.component.scss',
})
export class FiveDayForecastComponent implements OnInit {
  id = signal<string>('');
  extendedForecast: WritableSignal<ExtendedForecastType> = signal({
    city: { name: '' },
    list: [],
  });

  constructor(
    public extendedForecastService: ExtendedForecastService,
    public router: ActivatedRoute
  ) {
    this.extendedForecast = this.extendedForecastService.extendedForecast;
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const zcode = params.get('zipcode');
      this.id.set(zcode as string);
    });
    if (this.id()) {
      this.extendedForecastService.getLocationByZipCode(this.id());
    }
  }
}
