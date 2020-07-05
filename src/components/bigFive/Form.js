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
  Grid,
  Box,
  Button,
  LinearProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/styles";
import BigFivePage from "./Page";

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
  question: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
  next: {
    marginTop: "4px",
    background: "linear-gradient(90deg, #714CD3 0%, #8E69EC 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
  },
  back: {
    marginBottom: "4px",
    background: "linear-gradient(90deg, #714CD3 0%, #8E69EC 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
  },
  finish: {
    marginTop: "4px",
    background: "linear-gradient(90deg, #F75291 0%, #FD81B1 100%)",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "capitalize",
  },
});

const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  style: { width: "inherit", height: "16px" },
  borderColor: "text.primary",
};

class BigFiveForm extends Component {
  state = {
    open: false,
    error: "",
    currentPage: 1,
    progress: 0,
  };

  componentDidMount() {
    this.props.getTemplateAction();
  }

  onClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false,
    });
  };

  onNext = () => {
    const { template } = this.props;
    if (template.doc.length > this.state.currentPage * 10) {
      let maxPage = template.doc.length / 10;
      if (template.doc.length % 10 > 0) {
        maxPage++;
      }
      const progress = ((this.state.currentPage + 1) * 100) / maxPage;
      this.setState({
        currentPage: this.state.currentPage + 1,
        progress: progress,
      });
    }
  };

  onBack = () => {
    const { template } = this.props;
    if (this.state.currentPage > 1) {
      let maxPage = template.doc.length / 10;
      if (template.doc.length % 10 > 0) {
        maxPage++;
      }
      const progress = ((this.state.currentPage - 1) * 100) / maxPage;
      this.setState({
        currentPage: this.state.currentPage - 1,
        progress: progress,
      });
    }
  };

  onFinish = () => {
    console.log("FINISH");
  };

  render() {
    const { open, error, currentPage, progress } = this.state;
    const { classes, template } = this.props;
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
        <LinearProgress
          variant="determinate"
          color="primary"
          value={progress}
        ></LinearProgress>
        <Grid container className={classes.question}>
          <Grid item xs={6}>
            <Typography>Saya adalah orang yang</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box borderBottom={1} {...defaultProps} />
          </Grid>
        </Grid>
        {template ? <BigFivePage page={currentPage}></BigFivePage> : null}

        <Container
          style={{
            paddingTop: "40px",
            paddingLeft: "32px",
            paddingRight: "32px",
            paddingBottom: "40px",
          }}
        >
          {currentPage > 1 ? (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.back}
              onClick={this.onBack}
            >
              <Grid container>
                <Grid item xs={4}>
                  {"<<"}
                </Grid>
                <Grid item xs={4}>
                  Sebelumnya
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </Button>
          ) : null}
          {template && template.doc.length > this.state.currentPage * 10 ? (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.next}
              onClick={this.onNext}
            >
              <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  Selanjutnya
                </Grid>
                <Grid item xs={4}>
                  {">>"}
                </Grid>
              </Grid>
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.finish}
              onClick={this.onFinish}
            >
              Selesai
            </Button>
          )}
        </Container>
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
  template: state.bigFive.template,
  inSession: state.bigFive.inSession,
});

export default withStyles(styles)(
  connect(mapStateToProps, { getTemplateAction })(BigFiveForm)
);
