import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import sts from "../../assets/images/VectorSTS.svg";
import ts from "../../assets/images/VectorTS.svg";
import bs from "../../assets/images/VectorBS.svg";
import s from "../../assets/images/VectorS.svg";
import ss from "../../assets/images/VectorSS.svg";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  legendTag: {
    textAlign: "center",
    fontWeight: theme.typography.fontWeightNormal,
    fontSize: "16px",
  },
  gray: {
    opacity: 0.4,
    filter: "grayscale(80%)",
  },
}));

const BigFivePage = (props) => {
  const classes = useStyles();
  const template = useSelector((state) => state.bigFive.template);
  const { page } = props;
  let limit = page * 10;
  if (limit > template.doc.length) {
    limit = template.doc.length;
  }
  const items = template.doc.slice((page - 1) * 10, limit);
  return (
    <div>
      {items.map((item) => (
        <div>
          <Grid
            container
            style={{
              paddingTop: "16px",
              paddingLeft: "20px",
              paddingRight: "32px",
            }}
          >
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <Typography>-</Typography>
            </Grid>
            <Grid item xs={11}>
              <Typography>{item.statement}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img src={sts} alt="sts" className={classes.gray} />{" "}
            </Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img src={ts} alt="ts" className={classes.gray} />{" "}
            </Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img src={bs} alt="bs" className={classes.gray} />{" "}
            </Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img src={s} alt="s" className={classes.gray} />{" "}
            </Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img src={ss} alt="ss" className={classes.gray} />{" "}
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default BigFivePage;
