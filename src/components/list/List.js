import React, { Component } from "react";
import { connect } from "react-redux";
import AppHeader from "../header/Header";
import {
  CssBaseline,
  Typography,
  Card,
  Grid,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import rectangle from "../../assets/images/Rectangle.svg";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "32px",
    lineHeight: 1.5,
    color: theme.palette.primary.dark,
  },
  testTitle: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: 1.5,
    color: theme.palette.primary.dark,
  },
  card: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    boxShadow:
      "1px 3px 3px -2px #A2DDFB, 1px 1px 1px -1px #A2DDFB, 1px 1px 3px -3px #A2DDFB",
  },
  testName: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: 1.5,
    color: theme.palette.primary.main,
  },
  media: {
    height: "80px",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  testDetails: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: 1.5,
    color: "#333333",
  },
});

class List extends Component {
  render() {
    const { classes, history } = this.props;

    return (
      <div>
        <CssBaseline />
        <AppHeader></AppHeader>
        <Typography className={classes.title}>Kategori Psikotes</Typography>
        <Typography className={classes.testTitle}>Tes Kepribadian</Typography>
        <Card className={classes.card}>
          <CardActionArea onClick={() => history.push("/big-five")}>
            <Grid container>
              <Grid item xs={3}>
                <CardMedia
                  className={classes.media}
                  image={rectangle}
                  title="Rectangle"
                />
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.testName}>
                  Big Five Personality Test
                </Typography>
                <Typography className={classes.testDetails}>
                  Tes Psikologi yang digunakan untuk mengukur 5 faktor utama
                  yang mempengaruhi kepribadian
                </Typography>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
});

export default withStyles(styles)(connect(mapStateToProps)(List));
