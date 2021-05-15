import getLocationInfo from "./locationHelper";

function generateWeatherDataObject(apiResults, locationInfo) {
  const weatherData = {
    city: locationInfo.city,
    country: locationInfo.country,
    latitude: apiResults.lat,
    longitude: apiResults.lon,
    timezoneOffset: apiResults.timezone_offset,
    current: {
      date: new Date(apiResults.current.dt * 1000),
      sunrise: new Date(apiResults.current.sunrise * 1000),
      sunset: new Date(apiResults.current.sunset * 1000),
      temp: apiResults.current.temp,
      humidity: apiResults.current.humidity,
      clouds: apiResults.current.clouds,
      wind: apiResults.current.wind_speed,
      weather: apiResults.current.weather[0].main,
      weatherDesc: apiResults.current.weather[0].description,
      weatherIcon: `http://openweathermap.org/img/w/${apiResults.current.weather[0].icon}.png`,
    },
    daily: [],
    hourly: [],
  };
  apiResults.daily.forEach((day) => {
    weatherData.daily.push({
      id: day.dt,
      date: new Date(day.dt * 1000),
      sunrise: new Date(day.sunrise * 1000),
      sunset: new Date(day.sunset * 1000),
      temp: day.temp,
      humidity: day.humidity,
      clouds: day.clouds,
      wind: day.wind_speed,
      weather: day.weather[0].main,
      weatherDesc: day.weather[0].description,
      weatherIcon: `http://openweathermap.org/img/w/${day.weather[0].icon}.png`,
    });
  });
  apiResults.hourly.forEach((hour, id) => {
    if (id < 8) {
      weatherData.hourly.push({
        id: hour.dt,
        date: new Date(hour.dt * 1000),
        temp: hour.temp,
        humidity: hour.humidity,
        clouds: hour.clouds,
        wind: hour.wind_speed,
        weather: hour.weather[0].main,
        weatherDesc: hour.weather[0].description,
        weatherIcon: `http://openweathermap.org/img/w/${hour.weather[0].icon}.png`,
      });
    }
  });

  return weatherData;
}

export default async function requestWeatherData(latitude, longitude) {
  const baseUrl = "https://api.openweathermap.org/data/2.5/onecall";
  const apiKey = process.env.REACT_APP_MAPS_API_KEY;
  const units = "metric";
  const apiResults = await (
    await fetch(
      `${baseUrl}?lat=${latitude}&lon=${longitude}&exclude=minutely&units=${units}&appid=${apiKey}`
    )
  ).json();

  if (apiResults.cod) {
    throw new Error(`API call failed with error: ${apiResults.message}`);
  }

  const locationInfo = await getLocationInfo(latitude, longitude);
  return generateWeatherDataObject(apiResults, locationInfo);
}
