import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';
import { environemnt } from '../../environments/environment';
import { GeocodeResponse, WeatherResponse } from '../models/types';
import { Subject, takeUntil } from 'rxjs';
import { WeatherBaseService } from './base/weather-base';

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements OnDestroy, WeatherBaseService {
  readonly cancellation = new Subject<void>();
  zipCodesArray: WritableSignal<string[]> = signal([]);
  weatherConditions: WritableSignal<WeatherResponse[]> = signal([
    {
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
    },
  ]);

  constructor(private httpClient: HttpClient) {}

  addZipCodesToArray(input: string) {
    //We update the signal array with the new vlaue coming from input
    this.zipCodesArray.update((value) => [...value, input]);
    //We save the updated signal array value calling the following method
    this.saveArrayToLocalStorage(this.zipCodesArray());
    this.getLocationByZipCode(input);
  }

  saveArrayToLocalStorage(value: string[]) {
    //We convert the array into a string
    let retArray = JSON.stringify(value);
    localStorage.setItem('zipcodes', retArray);
  }

  //If we have codes saved to localstorage, retrieve them and store it into the signal
  getCodesFromLocalStorage() {
    let retString = localStorage.getItem('zipcodes');
    let retArray = retString ? JSON.parse(retString) : [];
    //Store the values in our signal
    this.zipCodesArray.update((val) => [...val, ...retArray]);
    this.zipCodesArray().map((zcode) => this.getLocationByZipCode(zcode));
  }

  getLocationByZipCode(zipcode: string) {
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
  getLatLongByZipCode(lat: number, lon: number, name: string, zipCode: string) {
    console.log('get weather with zip code');
    this.httpClient
      .get<WeatherResponse>(
        `${environemnt.weatherUrl}?lat=${lat}&lon=${lon}&appid=${environemnt.apiKey}&units=metric`
      )
      .pipe(takeUntil(this.cancellation))
      .subscribe((res) => {
        const resData: WeatherResponse = {
          zipcode: zipCode,
          cityName: name,
          main: res.main,
          weather: res.weather,
        };
        this.weatherConditions.update((val) => [...val, resData]);
      });
  }

  ngOnDestroy(): void {
    this.cancellation.next();
    this.cancellation.complete();
  }
}
