import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { UserContext } from "./UserContext";
import requestWeatherData from "../utils/weatherDataHelper";

export const LocationContext = createContext({});

export default function LocationProvider(props) {
  const { children } = props;
  const { user } = useContext(UserContext);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });

  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [savedCityData, setSavedCityData] = useState(null);

  const fetchCurrentLocationData = useCallback(async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

    const apiResults = await requestWeatherData(
      currentLocation.latitude,
      currentLocation.longitude
    );
    setCurrentLocationData(apiResults);
    console.log(apiResults);
  }, [currentLocation.latitude, currentLocation.longitude]);

  useEffect(() => {
    fetchCurrentLocationData().catch((err) => {
      console.error(err);
    });
  }, [currentLocation.latitude, currentLocation.longitude]);

  const fetchSavedLocationData = useCallback(async () => {
    const apiResults = user.savedCities.map(async (city) => {
      return requestWeatherData(city.latitude, city.longitude);
    });
    Promise.all(apiResults).then((data) => {
      setSavedCityData(data);
    });
  }, []);

  useEffect(() => {
    fetchSavedLocationData().catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <LocationContext.Provider
      value={{
        currentLocationData,
        savedCityData,
        currentLocation,
        setCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
