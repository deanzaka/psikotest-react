import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateTemplateAction } from "../../actions/stressActions";
import sts from "../../assets/images/VectorSTS.svg";
import ts from "../../assets/images/VectorTS.svg";
import bs from "../../assets/images/VectorBS.svg";
import s from "../../assets/images/VectorS.svg";
import ss from "../../assets/images/VectorSS.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  legendTag: {
    textAlign: "center",
    fontWeight: theme.typography.fontWeightNormal,
    fontSize: "16px",
  },
  selected: {
    cursor: "pointer",
  },
  gray: {
    opacity: 0.4,
    filter: "grayscale(80%)",
    cursor: "pointer",
  },
  errorText: {
    color: "#F75291",
    fontWeight: "bold",
  },
}));

const StressPage = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const template = useSelector((state) => state.stress.template);
  const hasError = useSelector((state) => state.stress.hasError);
  const { page } = props;
  let limit = page * 8;
  if (limit > template.doc.length) {
    limit = template.doc.length;
  }

  const onClick = (e) => {
    const input = e.target.name.split(":");
    template.doc[parseInt(input[0]) - 1].score = parseInt(input[1]);
    dispatch(updateTemplateAction(template));
  };

  return (
    <div>
      {template.doc.slice((page - 1) * 8, limit).map((question) => (
        <div key={question.indexNumber.toString()}>
          <Grid
            container
            style={{
              paddingTop: "16px",
              paddingLeft: "20px",
              paddingRight: "32px",
            }}
          >
            <Grid
              item
              xs={1}
              style={{
                textAlign: "center",
              }}
            >
              <Typography
                className={
                  hasError && typeof question.score === "undefined"
                    ? classes.errorText
                    : null
                }
              >
                {question.indexNumber}.
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <Typography
                className={
                  hasError && typeof question.score === "undefined"
                    ? classes.errorText
                    : null
                }
              >
                {question.statement}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img
                src={sts}
                alt="sts"
                className={
                  question.score === 1 ? classes.selected : classes.gray
                }
                name={question.indexNumber + ":1"}
                onClick={onClick}
              />{" "}
            </Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img
                src={ts}
                alt="ts"
                className={
                  question.score === 2 ? classes.selected : classes.gray
                }
                name={question.indexNumber + ":2"}
                onClick={onClick}
              />{" "}
            </Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img
                src={bs}
                alt="bs"
                className={
                  question.score === 3 ? classes.selected : classes.gray
                }
                name={question.indexNumber + ":3"}
                onClick={onClick}
              />{" "}
            </Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img
                src={s}
                alt="s"
                className={
                  question.score === 4 ? classes.selected : classes.gray
                }
                name={question.indexNumber + ":4"}
                onClick={onClick}
              />{" "}
            </Grid>
            <Grid item xs={2} className={classes.legendTag}>
              <img
                src={ss}
                alt="ss"
                className={
                  question.score === 5 ? classes.selected : classes.gray
                }
                name={question.indexNumber + ":5"}
                onClick={onClick}
              />{" "}
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default StressPage;
