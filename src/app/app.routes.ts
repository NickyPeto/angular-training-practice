import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'forecast/:zipcode',
    loadComponent: () =>
      import('./views/home/five-day-forecast/five-day-forecast.component').then(
        (c) => c.FiveDayForecastComponent
      ),
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
