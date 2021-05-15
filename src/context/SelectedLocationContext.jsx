import { useState, createContext, useContext, useEffect } from "react";
import { LocationContext } from "./LocationContext";

export const SelectedLocationContext = createContext({});

export default function SelectedLocationProvider(props) {
  const { children } = props;
  const { currentLocationData } = useContext(LocationContext);

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    setSelectedLocation(currentLocationData);
  }, [currentLocationData]);

  return (
    <SelectedLocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </SelectedLocationContext.Provider>
  );
}
