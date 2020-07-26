import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { bigFiveTypes } from "../../actions/types";
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

const TimeUpDialog = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const onBack = async () => {
    dispatch({ type: bigFiveTypes.BF_CLEAR });
    localStorage.removeItem("endTime");
    history.push("/");
  };

  return (
    <div className={classes.paper}>
      <Typography className={classes.title}>
        Waktu habis. Terima kasih
      </Typography>
      <Button fullWidth variant="contained" color="primary" onClick={onBack}>
        Kembali ke menu utama
      </Button>
    </div>
  );
};

export default TimeUpDialog;
