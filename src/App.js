import React from "react";
import { Container } from "@material-ui/core";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "./App.css";
import store from "./store";
import Login from "./components/login/Login";
// import Home from "./components/home/Home";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Profile from "./components/profile/Profile";
import List from "./components/list/List";
// import BigFiveIntro from "./components/bigFive/Intro";
// import BigFiveForm from "./components/bigFive/Form";
import StressIntro from "./components/stress/Intro";
import StressForm from "./components/stress/Form";
import LonelinessIntro from "./components/loneliness/Intro";
import LonelinessForm from "./components/loneliness/Form";
import StoryForm from "./components/story/Form";
// import RMIBIntro from "./components/rmib/Intro";
// import RMIBForm from "./components/rmib/Form";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#714CD3",
      main: "#8E69EC",
      dark: "#54447E",
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
                minHeight: "100vh",
              }}
            >
              <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute
                  exact
                  path="/"
                  component={List}
                ></ProtectedRoute>
                {/* <ProtectedRoute
                  exact
                  path="/big-five"
                  component={BigFiveIntro}
                ></ProtectedRoute>
                <ProtectedRoute
                  exact
                  path="/big-five/form"
                  component={BigFiveForm}
                ></ProtectedRoute> */}
                <ProtectedRoute
                  exact
                  path="/stress"
                  component={StressIntro}
                ></ProtectedRoute>
                <ProtectedRoute
                  exact
                  path="/stress/form"
                  component={StressForm}
                ></ProtectedRoute>
                <ProtectedRoute
                  exact
                  path="/loneliness"
                  component={LonelinessIntro}
                ></ProtectedRoute>
                <ProtectedRoute
                  exact
                  path="/loneliness/form"
                  component={LonelinessForm}
                ></ProtectedRoute>
                <ProtectedRoute
                  exact
                  path="/story"
                  component={StoryForm}
                ></ProtectedRoute>
                {/* <ProtectedRoute
                  exact
                  path="/rmib"
                  component={RMIBIntro}
                ></ProtectedRoute>
                <ProtectedRoute
                  exact
                  path="/rmib/form"
                  component={RMIBForm}
                ></ProtectedRoute> */}
                <ProtectedRoute
                  exact
                  path="/profile"
                  component={Profile}
                ></ProtectedRoute>
                {/* <ProtectedRoute
                  exact
                  path="/"
                  component={Home}
                ></ProtectedRoute> */}
              </Switch>
            </Container>
          </div>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
