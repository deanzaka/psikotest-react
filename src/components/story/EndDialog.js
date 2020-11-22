import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Button, Snackbar, Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndDialogOpen,
  submitStoryAction,
} from "../../actions/storyActions";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { storyTypes } from "../../actions/types";
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
  const accessToken = useSelector((state) => state.login.user.accessToken);
  const [error, setError] = React.useState("");
  const [openError, setOpenError] = React.useState(false);
  const [openThanks, setThanks] = React.useState(false);

  const onFinish = async () => {
    const content = localStorage.getItem("story-content");
    const err = await trackPromise(submitStoryAction(accessToken, content));
    if (err) {
      setError(err.toString());
    }
    setThanks(true);
  };

  const onBack = async () => {
    dispatch({ type: storyTypes.STORY_CLEAR });
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
          Apakah anda yakin untuk mengirim? Anda hanya memiliki satu kesempatan.
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
