export const environemnt = {
  // + ?zip={zip code},{country code}&appid={API key}
  geocodeUrl: `http://api.openweathermap.org/geo/1.0/zip`,
  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  weatherUrl: `https://api.openweathermap.org/data/2.5/weather`,
  //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  extendedForecastUrl: `https://api.openweathermap.org/data/2.5/forecast`,
  apiKey: import.meta.env['NG_APP_API_KEY'],
};
