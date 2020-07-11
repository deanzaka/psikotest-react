import React from "react";
import {
  Grid,
  Typography,
  // makeStyles,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateTemplateAction } from "../../actions/bigFiveActions";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   legendTag: {
//     textAlign: "center",
//     fontWeight: theme.typography.fontWeightNormal,
//     fontSize: "16px",
//   },
//   selected: {
//     cursor: "pointer",
//   },
//   gray: {
//     opacity: 0.4,
//     filter: "grayscale(80%)",
//     cursor: "pointer",
//   },
// }));

const BigFivePage = (props) => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const template = useSelector((state) => state.bigFive.template);
  const { page } = props;
  let limit = page * 10;
  if (limit > template.doc.length) {
    limit = template.doc.length;
  }

  const onChange = (e) => {
    template.doc[e.target.name - 1].score = e.target.value;
    dispatch(updateTemplateAction(template));
  };

  return (
    <div>
      {template.doc.slice((page - 1) * 10, limit).map((question) => (
        <div key={question.indexNumber.toString()}>
          <Grid
            container
            style={{
              paddingTop: "16px",
              paddingLeft: "20px",
              paddingRight: "32px",
            }}
          >
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <Typography>{question.indexNumber}.</Typography>
            </Grid>
            <Grid item xs={11}>
              <Typography>{question.statement}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            style={{
              paddingLeft: "20px",
              paddingRight: "32px",
            }}
          >
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={question.indexNumber.toString()}
                  name={question.indexNumber.toString()}
                  value={question.score ? question.score.toString() : "0"}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Sangat Tidak Setuju"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Tidak Setuju"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Biasa Saja"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Setuju"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="Sangat Setuju"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default BigFivePage;
