import React, { Component } from "react";
import { connect } from "react-redux";
import AppHeader from "../header/Header";
import { CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({});

class List extends Component {
  render() {
    // const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <AppHeader></AppHeader>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
});

export default withStyles(styles)(connect(mapStateToProps)(List));
