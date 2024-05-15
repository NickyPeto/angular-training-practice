import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { WeatherBannerComponent } from '../../components/weather-banner/weather-banner.component';
import { WeatherResponse } from '../../models/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, WeatherBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  zipCode: WritableSignal<string> = signal('');
  zipCodesArray: WritableSignal<string[]> = signal([]);
  weatherConditions: WritableSignal<WeatherResponse[]> = signal([]);

  constructor(public weatherService: WeatherService) {
    this.weatherConditions = this.weatherService.weatherConditions;
  }

  ngOnInit(): void {
    this.weatherService.getCodesFromLocalStorage();
  }

  addZipCodeToList() {
    this.weatherService.addZipCodesToArray(this.zipCode());
  }

  removeElement(zipcode: string, index: number) {
    this.zipCodesArray.update((val) => val.filter((n) => n !== zipcode));
    this.weatherConditions.update((curr) =>
      curr.filter((val) => val.zipcode !== zipcode)
    );
  }
}
