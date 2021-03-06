import React from "react";
import { withRouter } from "react-router-dom";
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
import logo from "../../assets/images/Logo.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { rootTypes } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoContainer: {
    paddingLeft: "0px",
  },
  logo: {
    top: "50%",
    width: theme.spacing(20),
  },
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

const Header = () => {
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

  const onEditProfile = (e) => {
    onClose(e);

    history.push("/profile");
  };

  const onLogout = (e) => {
    onClose(e);

    dispatch({ type: rootTypes.DESTROY_SESSION });
    window.location.reload(false);
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
          <Container className={classes.logoContainer}>
            <img className={classes.logo} src={logo} alt="Logo" />{" "}
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
                      <MenuItem
                        className={classes.menuItem}
                        onClick={onEditProfile}
                      >
                        Edit Profil
                      </MenuItem>
                      <MenuItem className={classes.menuItem} onClick={onLogout}>
                        Keluar
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
