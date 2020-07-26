import React from "react";
import Timer from "react-compound-timer";
import { Paper, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setTimeUp, submitTemplateAction } from "../../actions/bigFiveActions";

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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.user.token);
  const template = useSelector((state) => state.bigFive.template);

  let endTime = JSON.parse(localStorage.getItem("endTime"));
  if (!endTime) {
    endTime = Date.now() + 60000 * 30;
    localStorage.setItem("endTime", endTime);
  }
  let timer = endTime - Date.now();
  let cp = [
    {
      time: 0,
      callback: async () => {
        await submitTemplateAction(token, template);
        dispatch(setTimeUp(true));
      },
    },
  ];

  return (
    <div className={classes.timer}>
      <Paper className={classes.paper}>
        <Timer
          initialTime={timer}
          lastUnit="h"
          direction="backward"
          formatValue={(number) => ("00" + number).slice(-2)}
          checkpoints={cp}
        >
          {() => (
            <React.Fragment>
              Waktu tersisa: <Timer.Minutes />:<Timer.Seconds />
            </React.Fragment>
          )}
        </Timer>
      </Paper>
    </div>
  );
};

export default TimerCard;
