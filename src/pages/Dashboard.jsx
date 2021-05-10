import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useContext } from "react";
import CityCard from "../components/CityCard";
import ForecastCard from "../components/ForecastCard";
import { UserContext } from "../context/UserContext";
import { LocationContext } from "../context/LocationContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const { weatherData } = useContext(LocationContext);
  return (
    <>
      <Typography paragraph variant="h5" component="h2">
        Weather Forecast
      </Typography>
      <Typography paragraph component="div">
        <Grid container spacing={2}>
          {user.savedCities.map((city) => (
            <Grid item md key={city.city}>
              <CityCard city={city} />
            </Grid>
          ))}
        </Grid>
      </Typography>
      <br />
      <Typography paragraph variant="h6" component="h2">
        {weatherData && (
          <>
            {weatherData.city}, {weatherData.country}
          </>
        )}
      </Typography>

      <Typography paragraph component="div">
        {weatherData && (
          <Grid container spacing={2}>
            {weatherData.daily.map((day) => (
              <Grid item md key={day.id}>
                <ForecastCard dailyData={day} />
              </Grid>
            ))}
          </Grid>
        )}
      </Typography>
      <br />
      <Typography paragraph variant="h6" component="h2">
        Weather Graph
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel.
      </Typography>
    </>
  );
}
