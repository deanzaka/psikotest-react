import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Button, Snackbar, Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemplateAction,
  setStartDialogOpen,
} from "../../actions/stressActions";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
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

const StartDialog = () => {
  const { promiseInProgress } = usePromiseTracker();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const isExists = useSelector((state) => state.stress.isExists);
  const [openError, setOpenError] = React.useState(false);
  const [error, setError] = React.useState("");

  const onStart = async () => {
    const tempErr = await trackPromise(dispatch(getTemplateAction()));
    if (tempErr) {
      setError(tempErr.toString());
      setOpenError(true);
      return;
    }

    dispatch(setStartDialogOpen(false));
    history.push("/stress/form");
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
      {isExists ? (
        <Typography className={classes.title}>
          Anda hanya memiliki satu kesempatan.
        </Typography>
      ) : (
        <Typography className={classes.title}>
          Apakah anda yakin untuk memulai? Anda hanya memiliki satu kesempatan.
        </Typography>
      )}
      {isExists ? (
        <Grid container>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => dispatch(setStartDialogOpen(false))}
            >
              Kembali
            </Button>
          </Grid>
        </Grid>
      ) : (
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
      )}
      <Modal open={promiseInProgress}>
        <LoadingIndicator />
      </Modal>

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
