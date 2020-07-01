import React, { Component } from "react";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { ArrowBack, Done } from "@material-ui/icons";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  box: {
    height: theme.spacing(8),
    justifyContent: "center",
    boxShadow:
      "0px 3px 3px -2px #A2DDFB, 0px 1px 1px -1px #A2DDFB, 0px 1px 3px -3px #A2DDFB",
  },
  headerGrid: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  headerIcon: { fontSize: "32px" },
  headerTitle: {
    paddingLeft: theme.spacing(3),
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: 1.5,
  },
});

class Profile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container
        component="main"
        style={{
          padding: 0,
        }}
      >
        <CssBaseline />
        <AppBar position="relative" color="default" className={classes.box}>
          <Toolbar>
            <Grid container className={classes.headerGrid}>
              <Grid item xs={1}>
                <ArrowBack className={classes.headerIcon} />
              </Grid>
              <Grid item xs={10}>
                <Typography className={classes.headerTitle}>
                  Ubah profil
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Done className={classes.headerIcon} />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
});

export default withStyles(styles)(connect(mapStateToProps)(Profile));
