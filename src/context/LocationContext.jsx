import { useState, createContext, useEffect } from "react";
import requestWeatherData from "../utils/weatherDataHelper";

export const LocationContext = createContext({});

export default function LocationProvider(props) {
  const { children } = props;
  const [location, setLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });

      const apiResults = await requestWeatherData(
        location.latitude,
        location.longitude
      );
      setWeatherData(apiResults);
      console.log(apiResults);
    };
    fetchData();
  }, [location.latitude, location.longitude]);

  return (
    <LocationContext.Provider value={{ weatherData, location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
