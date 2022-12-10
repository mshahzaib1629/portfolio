import React from "react";
import {
  Container,
  Typography,
  makeStyles,
  Divider,
  useTheme,
  Box,
  useMediaQuery,
} from "@material-ui/core";
import Social from "../Social";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <Container>
      <Divider style={{ backgroundColor: theme.palette.primary.main }} />
      <Box className={classes.footer}>
        {isMobile && <Social mobile />}
        <Typography variant="body2" color="initial">
          © 2022 Shahzaib Minhas, Inc
          <br />
          {/* Designed by{" "}
          <a
            href="https://www.linkedin.com/in/mehdibha/"
            target={"_blank"}
            rel={"noreferrer"}
            className={classes.cite}
          >
            Mehdi BHA
          </a> */}
        </Typography>
        <Button
          variant="text"
          style={{ color: "white", }}
          sx={{ ml: 0, mt: 0, mb: 0, mr: 0 }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login to Portal
        </Button>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  cite: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default Footer;
