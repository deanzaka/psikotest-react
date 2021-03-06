import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Button, Snackbar, Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndDialogOpen,
  submitTemplateAction,
} from "../../actions/stressActions";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { stressTypes } from "../../actions/types";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

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

const EndDialog = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const template = useSelector((state) => state.stress.template);
  const [error, setError] = React.useState("");
  const [openError, setOpenError] = React.useState(false);
  const [openThanks, setThanks] = React.useState(false);
  const { accessToken } = JSON.parse(localStorage.getItem("user"));

  const onFinish = async () => {
    const err = await trackPromise(submitTemplateAction(accessToken, template));
    if (err) {
      setError(err.toString());
    }
    localStorage.removeItem("startTime");
    setThanks(true);
  };

  const onBack = async () => {
    dispatch({ type: stressTypes.STRESS_CLEAR });
    history.push("/");
  };

  const onCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  if (openThanks) {
    return (
      <div className={classes.paper}>
        <Typography className={classes.title}>Terima kasih</Typography>
        <Button fullWidth variant="contained" color="primary" onClick={onBack}>
          Kembali ke menu utama
        </Button>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={onCloseError}
        >
          <Alert onClose={onCloseError} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    );
  } else {
    return (
      <div className={classes.paper}>
        <Typography className={classes.title}>
          Apakah anda yakin untuk mengakhiri?
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={onFinish}
            >
              Iya
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => dispatch(setEndDialogOpen(false))}
            >
              Tidak
            </Button>
          </Grid>
        </Grid>
        <Modal open={promiseInProgress}>
          <LoadingIndicator />
        </Modal>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={onCloseError}
        >
          <Alert onClose={onCloseError} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    );
  }
};

export default EndDialog;
