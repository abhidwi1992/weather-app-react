import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import { useContext } from "react";
import { SelectedLocationContext } from "../context/SelectedLocationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  selected: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
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
  const { city, id, selected } = props;
  const { setSelectedLocation } = useContext(SelectedLocationContext);
  const classes = useStyles();

  if (city) {
    return (
      <Card className={classes.root} onClick={() => setSelectedLocation(city)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${process.env.PUBLIC_URL}/img${id + 1}.jpeg`}
            title={city.city}
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
                  {moment(city.current.date)
                    .utc()
                    .utcOffset(city.timezoneOffset / 60)
                    .format("h:mm a")}
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.gridAvatar}>
                <Avatar
                  src={city.current.weatherIcon}
                  className={classes.avatarSmall}
                />
              </Grid>
            </Grid>
          </CardMedia>
          <CardContent>
            <Typography
              variant="body1"
              component="h3"
              className={selected ? classes.selected : null}
            >
              {city.city}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  return null;
}
