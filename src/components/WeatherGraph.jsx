/* eslint-disable react/jsx-props-no-spreading */
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
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
  AreaSeries,
  ScatterSeries,
  BarSeries,
  Tooltip,
  ZoomAndPan,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Animation,
  EventTracker,
  HoverState,
} from "@devexpress/dx-react-chart";
import moment from "moment";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  chart: {
    paddingRight: "20px",
  },
  title: {
    whiteSpace: "pre",
  },
  select: {
    width: theme.spacing(18),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    height: theme.spacing(5),
  },
  gridItem: {
    // border: "2px solid black",
  },
  popup: {
    width: theme.spacing(20),
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

const TooltipContent = (props) => {
  const { tooltipProps, metric, locationData, timeInterval } = props;
  const classes = useStyles();
  const selectedData =
    locationData[timeInterval][tooltipProps.targetItem.point];
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
    <>
      <Typography
        variant="body1"
        component="div"
        align="center"
      >{`${tooltipProps.text}${unit}`}</Typography>
      <p />
      {metric === "temp" && (
        <Typography variant="body2" component="div" align="left">
          <Grid container spacing={0} className={classes.popup}>
            <Grid item container xs={7}>
              Humidity:
            </Grid>
            <Grid item container xs={5} justify="flex-end">
              {selectedData.humidity} %
            </Grid>
            <Grid item container xs={7}>
              Wind Speed:
            </Grid>
            <Grid item container xs={5} justify="flex-end">
              {selectedData.wind} m/s
            </Grid>
          </Grid>
        </Typography>
      )}
      {metric === "humidity" && (
        <Typography variant="body2" component="div" align="left">
          <Grid container spacing={0} className={classes.popup}>
            <Grid item container xs={7}>
              Temp:
            </Grid>
            <Grid item container xs={5} justify="flex-end">
              {selectedData.temp.max
                ? selectedData.temp.max
                : selectedData.temp}{" "}
              °C
            </Grid>
            <Grid item container xs={7}>
              Wind Speed:
            </Grid>
            <Grid item container xs={5} justify="flex-end">
              {selectedData.wind} m/s
            </Grid>
          </Grid>
        </Typography>
      )}
      {(metric === "wind" || metric === "clouds") && (
        <Typography variant="body2" component="div" align="left">
          <Grid container spacing={0} className={classes.popup}>
            <Grid item container xs={7}>
              Temp:
            </Grid>
            <Grid item container xs={5} justify="flex-end">
              {selectedData.temp.max
                ? selectedData.temp.max
                : selectedData.temp}{" "}
              °C
            </Grid>
            <Grid item container xs={7}>
              Humidity:
            </Grid>
            <Grid item container xs={5} justify="flex-end">
              {selectedData.humidity} %
            </Grid>
          </Grid>
        </Typography>
      )}
    </>
  );
};

const avaialableMetrics = [
  { id: "Temperature", value: "temp" },
  { id: "Humidity", value: "humidity" },
  { id: "Cloudiness", value: "clouds" },
  { id: "Wind Speed", value: "wind" },
];

const availableTimeIntervals = ["daily", "hourly"];

const availableGraphs = ["Line Graph", "Area Graph", "Bar Graph"];

export default function WeatherGraph(props) {
  const { locationData } = props;
  const classes = useStyles();

  const [metric, setMetric] = useState("temp");
  const [graphType, setGraphType] = useState("Line Graph");
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
      <Grid container spacing={0}>
        <Grid
          item
          container
          xs={12}
          md={2}
          justify="center"
          alignItems="center"
        >
          <ButtonGroup size="medium" color="primary" className={classes.select}>
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
        <Grid item xs={false} md />
        <Grid item container justify="flex-end" xs={11} md={4}>
          <Select
            variant="outlined"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            displayEmpty
            className={classes.select}
            MenuProps={{ variant: "menu" }}
          >
            {avaialableMetrics.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.id}
              </MenuItem>
            ))}
          </Select>
          <Select
            variant="outlined"
            value={graphType}
            onChange={(e) => setGraphType(e.target.value)}
            displayEmpty
            className={classes.select}
            MenuProps={{ variant: "menu" }}
          >
            {availableGraphs.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <p />

      {graphType === "Line Graph" && (
        <Chart data={data} height={250} className={classes.chart}>
          <ArgumentAxis showLine={false} showGrid />
          <ValueAxis
            showLine
            labelComponent={(valueLabelProps) =>
              ValueLabel({ valueLabelProps, metric })
            }
          />
          <LineSeries name={metric} valueField={metric} argumentField="date" />
          <ScatterSeries
            name={metric}
            valueField={metric}
            argumentField="date"
          />
          <ZoomAndPan
            interactionWithArguments="pan"
            interactionWithValues="none"
          />

          <EventTracker />
          <HoverState />
          <Tooltip
            contentComponent={(tooltipProps) =>
              TooltipContent({
                tooltipProps,
                metric,
                locationData,
                timeInterval,
              })
            }
          />
          <Animation />
        </Chart>
      )}
      {graphType === "Area Graph" && (
        <Chart data={data} height={250} className={classes.chart}>
          <ArgumentAxis showLine={false} showGrid />
          <ValueAxis
            showLine
            labelComponent={(valueLabelProps) =>
              ValueLabel({ valueLabelProps, metric })
            }
          />
          <AreaSeries name={metric} valueField={metric} argumentField="date" />
          <ScatterSeries
            name={metric}
            valueField={metric}
            argumentField="date"
          />
          <ZoomAndPan
            interactionWithArguments="pan"
            interactionWithValues="none"
          />

          <EventTracker />
          <HoverState />
          <Tooltip
            contentComponent={(tooltipProps) =>
              TooltipContent({
                tooltipProps,
                metric,
                locationData,
                timeInterval,
              })
            }
          />
          <Animation />
        </Chart>
      )}
      {graphType === "Bar Graph" && (
        <Chart data={data} height={250} className={classes.chart}>
          <ArgumentAxis showLine={false} showGrid />
          <ValueAxis
            showLine
            labelComponent={(valueLabelProps) =>
              ValueLabel({ valueLabelProps, metric })
            }
          />
          <BarSeries name={metric} valueField={metric} argumentField="date" />
          <ZoomAndPan
            interactionWithArguments="pan"
            interactionWithValues="none"
          />

          <EventTracker />
          <HoverState />
          <Tooltip
            contentComponent={(tooltipProps) =>
              TooltipContent({
                tooltipProps,
                metric,
                locationData,
                timeInterval,
              })
            }
          />
          <Animation />
        </Chart>
      )}
    </Paper>
  );
}
