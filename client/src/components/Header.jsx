import React, {useState} from "react";
import { AppBar, Container, fade, InputBase, Toolbar, Typography } from "@material-ui/core";
import logo from "../logotype.png";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../redux/features/application";
import classnames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 6,
    },
    grow: {
        flexGrow: 1,
        backgroundColor: "#b8abab",
    },
    input: {
        width: 350,
    },

    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: 'blue'
    },
    inputRoot: {
        color: "blue",
    },
    inputInput: {
        borderRadius: 'solid' ,
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        //backgroundColor: "#000841",
        borderRadius: 4,
        width: "97%",
        margin: "auto",
        color: "white",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        color: "white",
        marginTop: theme.spacing(2),
    },
    btnSob: {
        textDecoration: "none",
        fontWeight: "bold",
        color: "white",
        marginLeft: 75,
        marginRight: 75,
        backgroundColor: "#000841",
    },
    btnVolonters: {
        textDecoration: "none",
        fontWeight: "bold",
        color: "blue", // дети
        marginLeft: 75,
        marginRight: 75,
        //backgroundColor: "#000841", //
    },
    btnLogUp: {
        //padding: "0 5px",
        textDecoration: "none",
        //color: "#000841",
        backgroundColor: "#fff",
        borderRadius: "3px",
        //marginLeft:400,
    },
    btnLogOut: {
        // padding: "0 5px",
        textDecoration: "none",
        color: "#e5266e",
        marginLeft: 10,
        backgroundColor: "#fff",
        borderRadius: "3px",
    },
    selectTitle: {
        textDecoration: "none",
        color: "#000",
    },
    menuItemLink: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "22px",
    },
    linkActive: {
        color: "red",
    },
    reg:{
        marginLeft:900,
        borderBottom: "none",
        borderRadius: "3px",

    },
    textDecoration: "none",
    color: "white",
    //backgroundColor: "#000841",
}));

function Header() {
    const token = useSelector((state) => state.application.token); // прописываем для авторизованных пользователей
    const [isLoggedOut, setIsLoggedOut] = useState(true);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        setIsLoggedOut(false);
        dispatch(logout());
    };

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
                        <NavLink color="inherit" to={`/`}>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                            >
                                <img src={logo} alt="logo" />
                            </IconButton>
                        </NavLink>
                        <div  className={classes.reg}>
                            <Button color="inherit">
                                <NavLink
                                    className={classnames(
                                        classes.btnLogUp,
                                        pathname === "/registration" && classes.linkActive
                                    )}
                                    to={`/registration`}
                                >
                                    Регистрация
                                </NavLink>
                            </Button>
                            <Button color="inherit">
                                <NavLink
                                    className={classnames(
                                        classes.btnLogUp,
                                        pathname === "/login" && classes.linkActive
                                    )}
                                    to={`/login`}
                                >
                                    {" "}
                                    Войти
                                </NavLink>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    return (
        <div>
            <AppBar color="transparent" position="sticky" className={classes.appbar}>
                <Toolbar>
                    <NavLink color="inherit" to={`/`}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <img src={logo} alt="logo" />
                        </IconButton>
                    </NavLink>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit">
                            <NavLink
                                className={classnames(
                                    classes.btnVolonters,
                                    pathname === "/notes/all" && classes.linkActive
                                )}
                                to={`/notes/all`}
                            >
                                {" "}
                                Фото галерея
                            </NavLink>
                        </Button>
                    </Typography>
                    <Button color="inherit" disableElevation>
                        <NavLink
                            className={classnames(
                                classes.btnLogUp,
                                pathname === "/admin" && classes.linkActive
                            )}
                            to={`/admin`}
                        >
                            Личный кабинет
                        </NavLink>
                    </Button>

                    <Button color="inherit" value={isLoggedOut} onClick={handleLogout}>
                        <NavLink
                            className={classnames(
                                classes.btnLogOut,
                                pathname === "/login" && classes.linkActive
                            )}
                            to={`/`}
                        >
                            {" "}
                            Выйти
                        </NavLink>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
