import { Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';
import { WeatherBaseService } from './base/weather-base';
import { HttpClient } from '@angular/common/http';
import { environemnt } from '../../environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { ExtendedForecastType, GeocodeResponse } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class ExtendedForecastService implements OnDestroy, WeatherBaseService {
  readonly cancellation = new Subject<void>();
  extendedForecast: WritableSignal<ExtendedForecastType> = signal({
    city: { name: '' },
    list: [],
  });
  constructor(private httpClient: HttpClient) {}

  getLocationByZipCode(zipcode: string): void {
    this.httpClient
      .get<GeocodeResponse>(
        `${environemnt.geocodeUrl}?zip=${zipcode}&appid=${environemnt.apiKey}`
      )
      .pipe(takeUntil(this.cancellation))
      .subscribe((response) => {
        this.getLatLongByZipCode(
          response.lat,
          response.lon,
          response.name,
          zipcode
        );
      });
  }
  ngOnDestroy(): void {
    this.cancellation.next();
    this.cancellation.complete();
  }
  getCodesFromLocalStorage(): void {
    throw new Error('Method not implemented.');
  }
  getLatLongByZipCode(
    lat: number,
    lon: number,
    name: string,
    zipCode: string
  ): void {
    this.httpClient
      .get<ExtendedForecastType>(
        `${environemnt.extendedForecastUrl}?lat=${lat}&lon=${lon}&appid=${environemnt.apiKey}&units=metric`
      )
      .pipe(takeUntil(this.cancellation))
      .subscribe((res) => {
        this.extendedForecast.update((prev) => {
          let filteredArray;
          filteredArray = res.list.filter((v) =>
            v.dt_txt?.includes('12:00:00')
          );
          return {
            ...prev,
            city: {
              name: res.city.name,
            },
            list: filteredArray,
          };
        });
      });
  }
}
