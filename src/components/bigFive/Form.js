import React, { Component } from "react";
import { connect } from "react-redux";
import { getTemplateAction } from "../../actions/bigFiveActions";
import {
  Snackbar,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/styles";

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
  headerTitle: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: 1.5,
    width: "100%",
    color: theme.palette.primary.dark,
  },
});

class BigFiveForm extends Component {
  state = {
    open: false,
    error: "",
  };
  onClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false,
    });
  };

  componentDidMount = async () => {
    const err = await this.props.getTemplateAction();
    if (err) {
      this.setState({
        error: err.toString(),
        open: true,
      });
    }
  };
  render() {
    const { open, error } = this.state;
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
            <Typography className={classes.headerTitle}>
              Big Five Personality Test
            </Typography>
          </Toolbar>
        </AppBar>
        <Snackbar open={open} autoHideDuration={6000} onClose={this.onClose}>
          <Alert onClose={this.onClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
});

export default withStyles(styles)(
  connect(mapStateToProps, { getTemplateAction })(BigFiveForm)
);
