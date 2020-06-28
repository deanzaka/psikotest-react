import React, { Component } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { loginAction } from "../../actions/loginActions";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  CssBaseline,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";

import logo from "../../assets/images/Logo.svg";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const styles = (theme) => ({
  paper: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  login: {
    marginTop: theme.spacing(10),
    fontWeight: "500",
    fontSize: "32px",
    lineHeight: "40px",
  },
  divider: {
    marginTop: theme.spacing(1),
    width: theme.spacing(20),
    height: "4px",
    backgroundColor: "#333333",
    borderRadius: "2px",
  },
  form: {
    marginTop: theme.spacing(7),
    fontSize: "16px",
  },
  submit: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    background: "linear-gradient(90deg, #F75291 0%, #FD81B1 100%)",
    fontWeight: "bold",
    fontSize: "20px",
  },
  forgot: {
    fontWeight: "500px",
    fontSize: "16px",
  },
});

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: "",
    open: false,
  };

  onClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false,
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (email === "") {
      this.setState({
        errors: {
          email: "Harap masukkan email",
        },
      });
      return;
    }
    if (password === "") {
      this.setState({
        errors: {
          password: "Harap masukkan password",
        },
      });
      return;
    }

    const err = await this.props.loginAction(email, password);
    if (err !== null) {
      this.setState({
        errors: {},
        open: true,
      });
    } else {
      this.setState({
        email: "",
        password: "",
        errors: {},
      });

      this.props.history.push("/");
    }
  };

  render() {
    const { classes } = this.props;
    const { email, password, errors, open } = this.state;
    return (
      <Container
        component="main"
        maxWidth="xs"
        style={{
          padding: 32,
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo} alt="Logo" />
          <Typography className={classes.login}>Masuk</Typography>
          <Divider className={classes.divider} variant="middle" />
          <form className={classes.form} onSubmit={this.onSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Alamat email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={this.onChange}
              error={typeof errors.email != "undefined"}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Kata sandi"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={this.onChange}
              error={typeof errors.password != "undefined"}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Masuk
            </Button>
            <Typography align="right">Lupa kata sandi?</Typography>
          </form>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={this.onClose}>
          <Alert onClose={this.onClose} severity="error">
            Email atau password salah
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(connect(null, { loginAction })(Login));