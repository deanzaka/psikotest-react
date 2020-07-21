import React from "react";
import { Paper, Typography, makeStyles } from "@material-ui/core";

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

const TestTimer = () => {
  const classes = useStyles();
  return (
    <div className={classes.timer}>
      <Paper className={classes.paper}>
        <Typography>this is floating</Typography>
      </Paper>
    </div>
  );
};

export default TestTimer;
