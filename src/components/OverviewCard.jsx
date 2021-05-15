import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { yellow } from "@material-ui/core/colors";
import { useContext } from "react";
import moment from "moment";
import { LocationContext } from "../context/LocationContext";
import { SelectedLocationContext } from "../context/SelectedLocationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 240,
  },
  media: {
    height: "50%",
  },
  blue: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
}));

export default function OverviewCard() {
  const classes = useStyles();

  const { currentLocationData } = useContext(LocationContext);
  const { setSelectedLocation } = useContext(SelectedLocationContext);

  if (currentLocationData) {
    return (
      <Card variant="outlined" className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.blue}
              src={currentLocationData.current.weatherIcon}
            />
          }
          title="Today"
          subheader={moment(currentLocationData.current.date).format(
            "MMMM Do, h:mm a"
          )}
        />
        <CardActionArea
          onClick={() => setSelectedLocation(currentLocationData)}
        >
          <CardContent className={classes.media} title="Hello">
            <Typography variant="h4" component="h3">
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1} />
                <Box width="100%" mr={1}>
                  {Math.round(currentLocationData.current.temp)}&deg;C
                </Box>
                <Box width="100%" mr={1} />
              </Box>
            </Typography>
            <Typography variant="h5" component="h4">
              <Box display="flex" alignItems="center">
                <Box width="10%" mr={1} />
                <Box width="100%" mr={1}>
                  {currentLocationData.city}
                </Box>
                <Box width="10%" mr={1} />
              </Box>
            </Typography>
            <Typography variant="h6" component="h4">
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1} />
                <Box width="100%" mr={1}>
                  {currentLocationData.country}
                </Box>
                <Box width="100%" mr={1} />
              </Box>
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h3">
              {currentLocationData.current.weather}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              Humidity:
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    value={currentLocationData.current.humidity}
                  />
                </Box>
                {currentLocationData.current.humidity}%
              </Box>
              Cloudiness:
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    value={currentLocationData.current.clouds}
                  />
                </Box>
                {currentLocationData.current.clouds}%
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  return null;
}
