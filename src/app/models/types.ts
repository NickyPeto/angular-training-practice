export type GeocodeResponse = {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
};

type MainWeather = {
  feels_like: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

export type WeatherResponse = {
  zipcode: string;
  cityName: string;
  main: MainWeather;
  weather: [
    {
      main: string;
    }
  ];
};

export type ExtendedForecastType = {
  city: {
    name: string;
  };
  list: ExtendedForecastListItemType[];
};

export type ExtendedForecastListItemType = {
  dt: number;
  main: MainWeather;
  weather: [
    {
      main: string;
    }
  ];
  dt_txt?: string;
};
