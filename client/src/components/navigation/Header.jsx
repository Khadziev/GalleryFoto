import React, {useContext, useState} from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Button,
} from "@material-ui/core";
import logo from "../../assets/images/iconFon.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../../redux/features/application/application";
import classnames from "classnames";
import {ThemeContext} from "../theme/ThemeProviderWrapper";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar: {
    borderRadius: 4,
    margin: "auto",
    color: "white",
  },
  linkActive: {
    color: "blue",
    textDecoration:'none'
  },
  rightButtons: {
    marginLeft: "auto",
  },
}));

function Header() {
  const token = useSelector((state) => state.application.token);
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedOut(false);
    dispatch(logout());
  };


  const { isDarkTheme } = useContext(ThemeContext);
  const textColor = isDarkTheme ? "white" : "blue";

  const classes = useStyles();

  if (!token) {
    return (
        <div>
          <AppBar
              color="transparent"
              position="sticky"
              className={classes.appbar}
          >
            <Toolbar>
              <Grid container alignItems="center">
                <Grid item>
                  <NavLink color="inherit" to={`/`}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                      <img style={{width: "70px", height: "auto"}} src={logo} alt="logo" />
                    </IconButton>
                  </NavLink>
                </Grid>
                <Grid item className={classes.rightButtons}>
                  <Button color="inherit">
                    <NavLink
                        className={classnames(
                            classes.linkActive,
                            pathname === "/registration" && classes.linkActive
                        )}
                        to={`/registration`}
                        style={{ color: textColor }}
                    >
                      Регистрация
                    </NavLink>
                  </Button>
                  <Button color="inherit">
                    <NavLink
                        className={classnames(
                            classes.linkActive,
                            pathname === "/login" && classes.linkActive
                        )}
                        to={`/login`}
                        style={{ color: textColor }}
                    >
                      Войти
                    </NavLink>
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
    );
  }

  return (
      <div>
        <AppBar color="transparent" position="sticky" className={classes.appbar}>
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item>
                <NavLink color="inherit" to={`/`}>
                  <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                  >
                    <img style={{width: "70px", height: "auto"}} src={logo} alt="logo" />
                  </IconButton>
                </NavLink>
              </Grid>
              <Grid item className={classes.grow}>
                <Button color="inherit">
                  <NavLink
                      className={classnames(
                          classes.linkActive,
                          pathname === "/notes/all" && classes.linkActive
                      )}
                      to={`/notes/all`}
                      style={{ color: textColor }}
                  >
                    Фото галерея
                  </NavLink>
                </Button>
              </Grid>
              <Grid item className={classes.rightButtons}>
                <Button color="inherit">
                  <NavLink  color={textColor}
                      className={classnames(
                          classes.linkActive,

                        pathname === "/admin" && classes.linkActive
                      )}
                      to={`/admin`}
                      style={{ color: textColor }}
                  >
                    Личный кабинет
                  </NavLink>
                </Button>
                <Button color="inherit" value={isLoggedOut} onClick={handleLogout}>
                  <NavLink
                      className={classnames(
                          classes.linkActive,
                          pathname === "/login" && classes.linkActive
                      )}
                      to={`/`}
                      style={{ color: textColor }}
                  >
                    Выйти
                  </NavLink>
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default Header;
