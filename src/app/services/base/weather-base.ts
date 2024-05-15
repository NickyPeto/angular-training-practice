import { Subject } from 'rxjs';

export abstract class WeatherBaseService {
  readonly cancellation = new Subject<void>();
  //If we have codes saved to localstorage, retrieve them and store it into the signal
  getCodesFromLocalStorage() {}

  getLocationByZipCode(zipcode: string) {}

  getLatLongByZipCode(
    lat: number,
    lon: number,
    name: string,
    zipCode: string
  ) {}
}
