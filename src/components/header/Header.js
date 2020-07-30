import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  AppBar,
  ClickAwayListener,
  Container,
  CssBaseline,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/HeaderLogo.svg";
import { useDispatch } from "react-redux";
import { rootTypes } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: { top: "50%" },
  box: {
    paddingRight: "0px",
    height: theme.spacing(8),
    justifyContent: "center",
    backgroundColor: "white",
    boxShadow:
      "0px 3px 3px -2px #A2DDFB, 0px 1px 1px -1px #A2DDFB, 0px 1px 3px -3px #A2DDFB",
  },
  menuButton: {
    float: "right",
    position: "relative",
    color: "black",
    marginRight: theme.spacing(1),
  },
  popOver: { width: "100%" },
  menuItem: { textAlign: "center", justifyContent: "center" },
  spacer: {
    height: theme.spacing(8),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const onToggle = (e) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const onClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  const onLogout = (e) => {
    onClose(e);

    dispatch({ type: rootTypes.DESTROY_SESSION });
    history.push("/login");
  };

  function onListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Container
      component="main"
      style={{
        padding: 0,
      }}
    >
      <CssBaseline />
      <AppBar ref={anchorRef} position="relative" className={classes.box}>
        <Toolbar>
          <Container className={classes.logo}>
            <img classes={classes.logo} src={logo} alt="Logo" />{" "}
          </Container>

          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={onToggle}
          >
            <Menu />
          </IconButton>

          <Popper
            className={classes.popOver}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={onClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={onListKeyDown}
                    >
                      {/* <MenuItem className={classes.menuItem} onClick={onClose}>
                        Edit Profile
                      </MenuItem> */}
                      <MenuItem className={classes.menuItem} onClick={onLogout}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default withRouter(Header);
