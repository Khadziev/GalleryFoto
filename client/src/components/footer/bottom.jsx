import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import CallIcon from "@material-ui/icons/Call";
import { Box } from "@material-ui/core";
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/application';

const useStyles = makeStyles({
  root: {
    flexGrow: 6,
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

  selectEmpty: {
    color: "white",

  },
  btnSob: {

    fontWeight: "bold",
    color: "white",
    marginLeft: 75,
    marginRight: 75,
    backgroundColor: "#000841",
  },
  btnVolonters: {
    textDecoration: "none",
    fontWeight: "bold",
    color: "blue",   // дети
    marginLeft: 75,
    marginRight: 75,
    //backgroundColor: "#000841", //
  },
  btnLogUp: {
    padding: "0 5px",
    textDecoration: "none",
    //color: "#000841",
    backgroundColor: "#fff",
    borderRadius: "3px",
  },
  btnLogOut: {
    padding: "0 5px",
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
  textDecoration: "none",
  color: "white",
  bottom: {
    backgroundColor: "#F5F5F5",
    color: "blue",

  },
});



function Bottom(props) {
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedOut(false);
    dispatch(logout());
  };

  return (
      <Box className={classes.bottom} style={{ marginTop: "350px" }}>
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
          <BottomNavigationAction
              className={classes.bottom}
              href="https://www.instagram.com/intocode/?hl=ru"
              label="Instagram"
              icon={<InstagramIcon />}
              //style={{ color: "white" }}
          />
          <BottomNavigationAction
              className={classes.bottom}
              href="https://www.facebook.com/childdiarynet/"
              label="Facebook"
              icon={<FacebookIcon />}
          />
          <BottomNavigationAction
              className={classes.bottom}
              href="https://t.me/joinchat/CZlygSZWMCY4OTAy"
              label="Связь с нами"
              icon={<CallIcon />}
          />
          <BottomNavigationAction
              className={classes.bottom}
              href="https://goo.gl/maps/JRhVQuuiY1ybiShZ6"
              label="Адрес"
              icon={<LocationOnIcon />}
              //style={{ color: "white" }}
          />
        </BottomNavigation>
      </Box>
  );

}

export default Bottom;