import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse } from '../../models/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-weather-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './weather-banner.component.html',
  styleUrl: './weather-banner.component.scss',
})
export class WeatherBannerComponent {
  @Input()
  zipcode: string = '';

  @Input()
  cityName: string = '';

  @Input()
  temperature: number = 0;

  @Input()
  maxTem: number = 0;

  @Input()
  minTemp: number = 0;

  @Input()
  weather: string = '';

  @Input()
  date?: string = '';

  weatherConditions: WritableSignal<WeatherResponse> = signal({
    zipcode: '',
    cityName: '',
    main: {
      feels_like: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    weather: [
      {
        main: '',
      },
    ],
  });

  constructor(private weatherService: WeatherService) {}

  removeElement() {
    throw new Error('Method not implemented.');
  }
}
