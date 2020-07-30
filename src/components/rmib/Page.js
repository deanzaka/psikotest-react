/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentData } from "../../actions/rmibActions";
import { Typography, Paper, Grid } from "@material-ui/core";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

const useStyles = makeStyles((theme) => ({
  table: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
  },
  item: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
  errorText: {
    color: "#F75291",
    fontWeight: "bold",
  },
}));

const RMIBPage = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const template = useSelector((state) => state.rmib.template);
  const user = useSelector((state) => state.login.user);
  // const hasError = useSelector((state) => state.rmib.hasError);
  const currentData = useSelector((state) => state.rmib.currentData);
  const { page } = props;
  let limit = page * 12;
  if (limit > template.doc.length) {
    limit = template.doc.length;
  }

  useEffect(() => {
    let data = template.doc.slice((page - 1) * 12, limit);
    for (let i in data) {
      data[i].id = parseInt(i);
    }
    dispatch(setCurrentData(data));
  }, [page]);

  const handleRLDDChange = (data) => {
    dispatch(setCurrentData(data));
  };

  let index = [];
  for (let i = 1; i < 13; i++) {
    index.push(
      <Typography className={classes.item} style={{ fontWeight: 500 }}>
        {i}
      </Typography>
    );
  }

  return (
    <div>
      <Grid container className={classes.table}>
        <Grid item xs={4}>
          {index}
        </Grid>
        <Grid item xs={8}>
          <RLDD
            items={currentData}
            itemRenderer={(item) => {
              return (
                <Paper className={classes.item}>
                  <Typography>
                    {(user.gender = "M" ? item.male : item.female)}
                  </Typography>
                </Paper>
              );
            }}
            onChange={handleRLDDChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default RMIBPage;
