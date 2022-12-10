import React from "react";
import { makeStyles, Container } from "@material-ui/core";

const FullPageContainer = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Container className={classes.container} {...rest}>
      {children}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "block",
    alignItems: "center",
    paddingTop: `calc( ${theme.spacing(4)}px + ${theme.navbarHeight} ) `,
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.navbarHeight,
    },
  },
}));

export default FullPageContainer;
