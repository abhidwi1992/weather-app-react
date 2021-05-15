import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useContext } from "react";
import CityCard from "../components/CityCard";
import ForecastCard from "../components/ForecastCard";
import { LocationContext } from "../context/LocationContext";
import { SelectedLocationContext } from "../context/SelectedLocationContext";

export default function Dashboard() {
  const { currentLocationData, savedCityData } = useContext(LocationContext);
  const { selectedLocation } = useContext(SelectedLocationContext);

  if (savedCityData && currentLocationData && selectedLocation) {
    return (
      <>
        <Typography paragraph variant="h5" component="h2">
          Weather Forecast
        </Typography>
        <Typography paragraph component="div">
          <Grid container spacing={2}>
            {savedCityData.map((city, id) => (
              <Grid item md key={city.city}>
                <CityCard
                  city={city}
                  id={id}
                  selected={city.city === selectedLocation.city}
                />
              </Grid>
            ))}
          </Grid>
        </Typography>
        <br />
        <Typography paragraph variant="h6" component="h2">
          {selectedLocation.city}, {selectedLocation.country}
        </Typography>

        <Typography paragraph component="div">
          <Grid container spacing={2}>
            {selectedLocation.daily.map((day) => (
              <Grid item md key={day.id}>
                <ForecastCard dailyData={day} />
              </Grid>
            ))}
          </Grid>
        </Typography>
        <br />
        <Typography paragraph variant="h6" component="h2">
          Weather Graph
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel.
        </Typography>
      </>
    );
  }
  return null;
}
