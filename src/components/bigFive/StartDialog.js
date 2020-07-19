import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Button, Snackbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getTemplateAction } from "../../actions/bigFiveActions";
import Alert from "@material-ui/lab/Alert";

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
  yes: {
    background: "linear-gradient(90deg, #F75291 0%, #FD81B1 100%)",
  },
}));

const StartDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openError, setOpenError] = React.useState(false);
  const [error, setError] = React.useState("");
  const { history } = props;

  const onStart = async () => {
    const err = await dispatch(getTemplateAction());
    if (err) {
      setError(err.toString());
    }

    history.push("/big-five/form");
  };

  const onCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

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
            onClick={() => window.location.reload(false)}
          >
            Tidak
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={openError} autoHideDuration={6000} onClose={onCloseError}>
        <Alert onClose={onCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StartDialog;