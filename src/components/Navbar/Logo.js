import React from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-scroll";

const Logo = ({ setHomeIsActive, ...rest }) => {
    const classes = useStyles();
    return (
        <Link
            spy
            smooth
            duration={500}
            offset={-70}
            to="home"
            onSetActive={() => setHomeIsActive(true)}
            onSetInactive={() => setHomeIsActive(false)}
            className={classes.root}
        >
            {/* <img src="images/shahzaib-home-white1.png" alt="logo" width="120px"/> */}
        </Link>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        cursor: "pointer",
    },
}));

export default Logo;
