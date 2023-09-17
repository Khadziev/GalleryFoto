import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "./ThemeProviderWrapper";

const useStyles = makeStyles((theme) => ({
  toggleButton: {
    color: theme.palette.primary.main,
  },
}));

function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const classes = useStyles();

  return (
    <IconButton onClick={toggleTheme} color="inherit" className={classes.toggleButton}>
      {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default ThemeToggle;
