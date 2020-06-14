import React, { Component } from "react";
import { connect } from "react-redux";
import { AppBar, Container, IconButton, Toolbar } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/HeaderLogo.svg";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: { top: "50%" },
  box: {
    height: theme.spacing(8),
    justifyContent: "center",
    boxShadow:
      "0px 2px 1px -1px #714CD3,0px 1px 1px 0px #714CD3,0px 1px 3px 0px #714CD3",
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
      <Container>
        <AppBar position="fixed" color="default" className={classes.box}>
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
        {/* add spacer behind the app bar */}
        <Container className={classes.spacer}></Container>
      </Container>
    );
  }
}

export default withStyles(styles)(connect(null, null)(Header));
