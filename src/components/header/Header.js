import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AppBar,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/HeaderLogo.svg";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: { top: "50%" },
  box: {
    paddingRight: "0px",
    height: theme.spacing(8),
    justifyContent: "center",
    boxShadow:
      "0px 3px 3px -2px #714CD3, 0px 1px 1px -1px #714CD3, 0px 1px 3px -3px #714CD3",
  },
  menuButton: {
    float: "right",
    position: "relative",
    marginRight: theme.spacing(1),
  },
  spacer: {
    height: theme.spacing(8),
  },
});

class Header extends Component {
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
            <Container className={classes.logo}>
              <img classes={classes.logo} src={logo} alt="Logo" />{" "}
            </Container>

            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>
    );
  }
}

export default withStyles(styles)(connect(null, null)(Header));
