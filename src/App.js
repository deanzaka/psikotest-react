import React from "react";
import { Container } from "@material-ui/core";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "./App.css";
import store from "./store";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#714CD3",
      main: "#7860D7",
      dark: "#8E69EC",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#F75291",
      main: "#E974A0",
      dark: "#FD81B1",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: [
      "Quicksand",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

console.log(theme);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <div className="App" style={{ backgroundColor: "#E5E5E5" }}>
            <Container
              maxWidth="xs"
              style={{
                padding: 0,
                backgroundColor: "#FFFFFF",
                height: "100vh",
              }}
            >
              <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute
                  exact
                  path="/"
                  component={Home}
                ></ProtectedRoute>
              </Switch>
            </Container>
          </div>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
