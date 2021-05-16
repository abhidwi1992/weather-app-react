import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import { useContext } from "react";
import { SelectedLocationContext } from "../context/SelectedLocationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 125,
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
    paddingLeft: theme.spacing(1),
    backgroundColor: "rgba(255,255,255,0.9)",
    borderTopLeftRadius: "10px",
  },
  gridItem: {
    border: "2px solid black",
  },
  grid: {
    height: "100%",
  },
  avatarSmall: {
    display: "inline-flex",
    marginLeft: theme.spacing(1),
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
              <Grid
                item
                container
                alignContent="center"
                justify="flex-end"
                xs={12}
              >
                <Box display="inline-flex" className={classes.gridCorner}>
                  <Typography variant="body1">
                    {moment(city.current.date)
                      .utc()
                      .utcOffset(city.timezoneOffset / 60)
                      .format("h:mm a")}
                  </Typography>
                  <Avatar
                    src={city.current.weatherIcon}
                    className={classes.avatarSmall}
                  />
                </Box>
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
