import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Button, Snackbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  getTemplateAction,
  setStartDialogOpen,
} from "../../actions/bigFiveActions";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4),
  },
  title: {
    fontSize: "18px",
    paddingBottom: theme.spacing(1),
    fontWeight: 500,
    lineHeight: 1.5,
    textAlign: "center",
  },
}));

const StartDialog = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [openError, setOpenError] = React.useState(false);
  const [error, setError] = React.useState("");

  const onStart = async () => {
    const err = await dispatch(getTemplateAction());
    if (err) {
      setError(err.toString());
      setOpenError(true);
      return;
    }

    dispatch(setStartDialogOpen(false));
    history.push("/big-five/form");
  };

  const onCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
    setOpenError(false);
  };

  return (
    <div className={classes.paper}>
      <Typography className={classes.title}>
        Apakah anda yakin untuk memulai tes?
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={onStart}
          >
            Iya
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => dispatch(setStartDialogOpen(false))}
          >
            Tidak
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={openError} autoHideDuration={6000} onClose={onCloseError}>
        <Alert
          style={{
            position: "absolute",
            top: "-53vh",
          }}
          onClose={onCloseError}
          severity="error"
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StartDialog;
