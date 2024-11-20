import React, { useContext } from "react";
import ThemeContext from "../../contexts/themeContext";
import { IconButton, makeStyles } from "@material-ui/core";
import { WbSunny, Brightness2 } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toggleButton: {
    position: "relative",
    width: 50,
    height: 50,
    padding: 8,
    backgroundColor: "transparent",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  iconWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    width: "50%",
    height: "100%",
    transition: "all 0.3s ease",
    fontSize: 30,
  },
  sunIcon: {
    left: 4,
    color: (props) => (props.isDarkMode ? "#666" : "#fc8c03") + " !important",
  },
  moonIcon: {
    right: 4,
    color: (props) => (props.isDarkMode ? "#fff" : "#666") + " !important",
  },
}));

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const classes = useStyles({ isDarkMode });

  return (
    <IconButton
      className={classes.toggleButton}
      onClick={() => setIsDarkMode(!isDarkMode)}
      aria-label="toggle theme"
      m={1}
    >
      <div className={classes.iconWrapper}>
        <WbSunny className={`${classes.icon} ${classes.sunIcon}`} />
        <Brightness2 className={`${classes.icon} ${classes.moonIcon}`} />
      </div>
    </IconButton>
  );
};

export default ThemeToggle;
