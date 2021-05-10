import { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import Save from "@material-ui/icons/Save";
import Create from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  gridPaper: {
    background: theme.palette.action.hover,
    padding: theme.spacing(1),
  },
  leftBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
  centerBox: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Settings(props) {
  const { requestAction } = props;
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState(user);
  const [action, setAction] = useState(requestAction);
  const classes = useStyles();

  const validateForm = () => {
    return !(form.name && form.email && form.address && form.city);
  };

  const onReset = () => {
    setAction("view");
  };

  const onSave = () => {
    setAction("view");
    setUser(form);
  };
  const onEdit = () => {
    setAction("edit");
  };

  if (action === "edit") {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>
        <p />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="name"
              name="name"
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="email"
              name="email"
              type="email"
              label="Email"
              value={form.gst}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              id="address"
              name="address"
              label="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="city"
              name="city"
              label="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              id="state"
              name="state"
              label="State / Province"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {action !== "onBoard" && (
              <Button
                onClick={onReset}
                variant="outlined"
                startIcon={<ClearOutlined />}
                disableElevation
                color="secondary"
              >
                Cancel
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={onSave}
              startIcon={<Save />}
              disableElevation
              disabled={validateForm()}
              color="primary"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Typography variant="h5" gutterBottom>
        User Information
      </Typography>
      <p />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>Name</b>
            </Typography>
            {user.name}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>Email</b>
            </Typography>
            {user.email}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>Address</b>
            </Typography>
            {user.address}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>City</b>
            </Typography>
            {user.city}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} className={classes.gridPaper}>
            <Typography>
              <b>State</b>
            </Typography>
            {user.state}
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.centerBox}>
          <br />
          <Button
            variant="contained"
            onClick={onEdit}
            startIcon={<Create />}
            disableElevation
            color="primary"
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
