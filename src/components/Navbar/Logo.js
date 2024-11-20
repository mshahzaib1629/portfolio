import { React, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-scroll";
import ThemeContext from "../../contexts/themeContext";

const Logo = ({ setHomeIsActive, onClick, ...rest }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const classes = useStyles({ isDarkMode });

  return (
    <Link
      spy
      smooth
      duration={500}
      offset={-70}
      onClick={onClick}
      to="home"
      onSetActive={() => setHomeIsActive(true)}
      onSetInactive={() => setHomeIsActive(false)}
      className={classes.root}
    >
      <img src="images/shahzaib-home-white1.png" alt="logo" width="120px" />
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    filter: (props) => props.isDarkMode ? "invert(0)" : "invert(1)",
  },
}));

export default Logo;
