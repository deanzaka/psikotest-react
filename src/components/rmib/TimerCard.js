import React from "react";
import Timer from "react-compound-timer";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  timer: {
    position: "fixed",
    bottom: "calc(100% - 110px)",
    right: "calc(50% - 216px)",
  },
  paper: {
    padding: "8px 8px",
  },
}));

const TimerCard = () => {
  const classes = useStyles();

  let startTime = JSON.parse(localStorage.getItem("startTime"));
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem("startTime", JSON.stringify(startTime));
  }
  let timer = Date.now() - startTime;

  return (
    <div className={classes.timer}>
      <Paper className={classes.paper}>
        <Timer
          initialTime={timer}
          lastUnit="h"
          direction="forward"
          formatValue={(number) => ("00" + number).slice(-2)}
        >
          {() => (
            <React.Fragment>
              Waktu berjalan: <Timer.Minutes />:<Timer.Seconds />
            </React.Fragment>
          )}
        </Timer>
      </Paper>
    </div>
  );
};

export default TimerCard;
