/* eslint-disable react/jsx-props-no-spreading */
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ScatterSeries,
  Tooltip,
  ZoomAndPan,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Animation,
  EventTracker,
  HoverState,
} from "@devexpress/dx-react-chart";
import { symbol, symbolCircle } from "d3-shape";
import moment from "moment";
import { useState } from "react";

const format = () => (tick) => tick;

const useStyles = makeStyles((theme) => ({
  chart: {
    paddingRight: "20px",
  },
  title: {
    whiteSpace: "pre",
  },
  select: {
    minWidth: theme.spacing(12),
    height: theme.spacing(6),
  },
}));

const ValueLabel = (props) => {
  const { valueLabelProps, metric } = props;
  let unit;
  switch (metric) {
    case "temp":
      unit = "°C";
      break;
    case "wind":
      unit = "m/s";
      break;
    default:
      unit = "%";
      break;
  }
  return (
    <ValueAxis.Label
      {...valueLabelProps}
      text={`${valueLabelProps.text} ${unit}`}
    />
  );
};

const Point = (type, styles) => (props) => {
  const { arg, val, color } = props;
  return (
    <path
      fill={color}
      transform={`translate(${arg} ${val})`}
      d={symbol()
        .size([10 ** 2])
        .type(type)()}
      style={styles}
    />
  );
};

const DiamondPoint = Point(symbolCircle, {
  stroke: "white",
  strokeWidth: "1px",
});

const LineWithDiamondPoint = (props) => (
  <>
    <LineSeries.Path {...props} />
    <ScatterSeries.Path {...props} pointComponent={DiamondPoint} />
  </>
);

const avaialableMetrics = [
  { id: "Temperature", value: "temp" },
  { id: "Humidity", value: "humidity" },
  { id: "Cloudiness", value: "clouds" },
  { id: "Wind Speed", value: "wind" },
];
const availableTimeIntervals = ["daily", "hourly"];

export default function WeatherGraph(props) {
  const { locationData } = props;
  const classes = useStyles();

  const [metric, setMetric] = useState("temp");
  const [timeInterval, setTimeInterval] = useState("daily");

  const data =
    timeInterval === "daily"
      ? locationData.daily.reduce(
          (acc, item) =>
            acc.concat({
              date: moment(item.date).format("MMMM DD"),
              temp: item.temp.max,
              clouds: item.clouds,
              humidity: item.humidity,
              wind: item.wind,
            }),
          []
        )
      : locationData.hourly.reduce(
          (acc, item) =>
            acc.concat({
              date: moment(item.date).format("HH:mm"),
              temp: item.temp,
              clouds: item.clouds,
              humidity: item.humidity,
              wind: item.wind,
            }),
          []
        );

  return (
    <Paper elevation={0}>
      <Grid container spacing={2}>
        <Grid item md={false} />
        <Grid item md={1}>
          <ButtonGroup
            size="large"
            color="secondary"
            // className={classes.select}
          >
            {availableTimeIntervals.map((item) => (
              <Button
                disabled={item === timeInterval}
                key={item}
                onClick={() => setTimeInterval(item)}
              >
                {item}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item md={9} />
        <Grid item md />
        <Grid item md={1}>
          <Select
            variant="outlined"
            value={metric}
            className={classes.select}
            onChange={(e) => setMetric(e.target.value)}
            displayEmpty
            MenuProps={{ variant: "menu" }}
          >
            {avaialableMetrics.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.id}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md />
      </Grid>
      <p />

      <Chart data={data} className={classes.chart}>
        <ArgumentAxis tickFormat={format} />
        <ValueAxis
          tickSize={1}
          showLine
          labelComponent={(valueLabelProps) =>
            ValueLabel({ valueLabelProps, metric })
          }
        />

        <LineSeries
          name={metric}
          valueField={metric}
          argumentField="date"
          seriesComponent={LineWithDiamondPoint}
        />
        <ZoomAndPan
          interactionWithArguments="pan"
          interactionWithValues="none"
        />
        <EventTracker />
        <HoverState />
        <Tooltip />
        <Animation />
      </Chart>
    </Paper>
  );
}
