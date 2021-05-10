import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { blue } from "@material-ui/core/colors";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 160,
  },
  media: {
    height: 20,
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));

export default function ForecastCard(props) {
  const { dailyData } = props;
  const classes = useStyles();

  if (dailyData) {
    return (
      <Card variant="outlined" className={classes.root}>
        <CardHeader
          avatar={
            <Avatar className={classes.blue} src={dailyData.weatherIcon} />
          }
          title={`${Math.round(dailyData.temp.min)} - ${Math.round(
            dailyData.temp.max
          )} °C`}
          subheader={moment(dailyData.date).format("dddd, MMMM DD")}
        />
      </Card>
    );
  }
  return null;
}
