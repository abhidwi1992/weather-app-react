import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { useState, useEffect } from "react";
import moment from "moment";
import requestWeatherData from "../utils/weatherDataHelper";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  gridCorner: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderTopLeftRadius: "10px",
  },
  gridAvatar: {
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  grid: {
    height: "100%",
  },
  avatarSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function CityCard(props) {
  const { city } = props;
  const classes = useStyles();
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiResults = await requestWeatherData(
        city.latitude,
        city.longitude
      );
      setCityData(apiResults);

      console.log(apiResults);
    };
    fetchData();
  }, [city.latitude, city.longitude]);

  if (cityData) {
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${process.env.PUBLIC_URL}/img${
              Math.floor(Math.random() * 5) + 1
            }.jpeg`}
            title={cityData.city}
          >
            <Grid
              container
              justify="flex-end"
              alignItems="flex-end"
              className={classes.grid}
            >
              <Grid item xs={5} />
              <Grid item xs={3} className={classes.gridCorner}>
                <Typography align="center" variant="body1" component="h3">
                  {moment(cityData.current.date)
                    .utc()
                    .utcOffset(cityData.timezoneOffset / 60)
                    .format("h:mm a")}
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.gridAvatar}>
                <Avatar
                  src={cityData.current.weatherIcon}
                  className={classes.avatarSmall}
                />
              </Grid>
            </Grid>
          </CardMedia>
          <CardContent>
            <Typography variant="body1" component="h3">
              {cityData.city}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  return null;
}
