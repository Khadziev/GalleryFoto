import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import CallIcon from "@material-ui/icons/Call";
import { Box } from "@material-ui/core";
import {ThemeContext} from "../theme/ThemeProviderWrapper";


const useStyles = makeStyles((theme) => ({
  bottom: {
    marginTop: "auto",
    [theme.breakpoints.up("md")]: {
      marginTop: "330px",
    },
  },
  icon: {
    "&:hover": {
      color: "#76F971",
    },
    label: {
      color: '#76F971'
    }
  },
  selected: {
    color: "blue",
  },
}));

export const Footer = ({ value, onChange }) => {
  const classes = useStyles();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
      <Box className={classes.bottom}>
        <BottomNavigation
            value={value}
            onChange={onChange}
            showLabels
            className={classes.root}
            style={{ backgroundColor: isDarkTheme ? "#0d1538" : "#ffffff" }}
        >
          <BottomNavigationAction
              href="https://www.instagram.com/intocode/?hl=ru"
              label ="Instagram"
              icon={<InstagramIcon className={classes.icon} />}
          />
          <BottomNavigationAction
              href="https://www.facebook.com/childdiarynet/"
              label="Facebook"
              icon={<FacebookIcon className={classes.icon} />}
          />
          <BottomNavigationAction
              href="https://t.me/Haz_882"
              label="Связь с нами"
              icon={<CallIcon className={classes.icon} />}
          />
          <BottomNavigationAction
              href="https://goo.gl/maps/JRhVQuuiY1ybiShZ6"
              label="Адрес"
              icon={<LocationOnIcon className={classes.icon} />}
          />
        </BottomNavigation>
      </Box>
  );
};
