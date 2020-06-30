import React, { Component } from "react";
import { connect } from "react-redux";
import AppHeader from "../header/Header";
import { CssBaseline, Typography, Paper } from "@material-ui/core";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import hello from "../../assets/images/HelloIllustration.png";

const styles = (theme) => ({
  greetGrid: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  greeting: {
    paddingTop: theme.spacing(3),
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: 1,
    color: theme.palette.primary.dark,
  },
  name: {
    fontSize: "40px",
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 1.5,
    color: theme.palette.primary.dark,
  },
  todoGrid: {
    position: "relative",
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  todoHead: {
    borderRadius: theme.spacing(1),
    color: "#FFFFFF",
    background: "linear-gradient(90deg, #714CD3 0%, #8E69EC 100%)",
    boxShadow: "none",
    paddingLeft: theme.spacing(3),
    fontSize: "20px",
    fontWeight: theme.typography.fontWeightBold,
    width: "calc(100% - 64px)",
    lineHeight: 2,
    position: "absolute",
    zIndex: 1,
  },
  todoBody: {
    borderRadius: theme.spacing(1),
    boxShadow:
      "0px 2px 1px -1px #A2DDFB,0px 1px 1px 0px #A2DDFB,0px 1px 3px 0px #A2DDFB",
    paddingTop: theme.spacing(7),
    paddingLeft: theme.spacing(3),
    width: "calc(100% - 64px)",
    position: "absolute",
    zIndex: 0,
  },
});

class Home extends Component {
  getGreetingTime = (m) => {
    let g = null;

    if (!m || !m.isValid()) {
      return;
    }

    const split_morning = 4;
    const split_afternoon = 10;
    const split_evening = 14;
    const split_night = 18;
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_morning && currentHour <= split_afternoon) {
      g = "Selamat Pagi,";
    } else if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = "Selamat Siang,";
    } else if (currentHour >= split_evening && currentHour <= split_night) {
      g = "Selamat Sore,";
    } else {
      g = "Selamat Malam,";
    }

    return g;
  };

  getFirstName = () => {
    if (this.props.user) {
      const name = this.props.user.name.split(" ");
      return name[0];
    } else {
      return "Sobi Empathy";
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <AppHeader></AppHeader>
        <Grid container className={classes.greetGrid}>
          <Grid item xs={8}>
            <Typography className={classes.greeting}>
              {this.getGreetingTime(moment())}
            </Typography>
            <Typography className={classes.name}>
              {this.getFirstName()}!
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <img classes={classes.hello} src={hello} alt="Hello" />
          </Grid>
        </Grid>
        <Grid container className={classes.todoGrid}>
          <Grid item xs={12}>
            <Paper className={classes.todoHead}>Hal yang harus dilakukan</Paper>
            <Paper className={classes.todoBody}>
              <Typography
                paragraph="true"
                fontWeight="500"
                onClick={() => this.props.history.push("/profile")}
              >
                Mengisi identitas pribadi
              </Typography>
              <Typography paragraph="true" fontWeight="500">
                Membaca informasi penggunaan
              </Typography>
              <Typography paragraph="true" fontWeight="500">
                Mengizinkan akses kamera
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
});

export default withStyles(styles)(connect(mapStateToProps)(Home));
