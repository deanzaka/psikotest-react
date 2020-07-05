import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect, useDispatch } from "react-redux";
import { loginAction } from "../../actions/loginActions";
import {
  Button,
  Container,
  CssBaseline,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";

import logo from "../../assets/images/Logo.svg";
import { makeStyles } from "@material-ui/styles";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
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
}));

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [open, setOpen] = React.useState("");

  const onClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setErrorEmail("Harap masukkan email");
      return;
    }
    if (password === "") {
      setErrorPassword("Harap masukkan password");
      return;
    }

    const err = await dispatch(loginAction(email, password));
    if (err) {
      setErrorEmail("");
      setErrorPassword("");
      setOpen(true);
    } else {
      setEmail("");
      setPassword("");
      setErrorEmail("");
      setErrorPassword("");

      props.history.push("/");
    }
  };

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
        <form className={classes.form} onSubmit={onSubmit} noValidate>
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
            onChange={onChange}
            error={errorEmail !== ""}
            helperText={errorEmail}
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
            onChange={onChange}
            error={errorPassword !== ""}
            helperText={errorPassword}
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
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity="error">
          Email atau password salah
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default connect(null, { loginAction })(Login);
