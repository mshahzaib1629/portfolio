import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Card as MuiCard,
  useMediaQuery,
  useTheme,
  CardContent,
  CardMedia,
  Typography,
  Icon,
  Box,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import { motion, useAnimation } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router";
import { GASendEvent } from "../../../utils/googleAnalytics";

const hoverVariants = {
  hover: {
    opacity: 1,
  },
  initial: {
    opacity: 0,
  },
};

const titleVariants = {
  hover: {
    y: 0,
    opacity: 1,
  },
  initial: {
    opacity: 0,
    y: 50,
  },
};

const Card = ({
  id,
  title,
  issuedBy,
  type,
  date,
  imageUrl,
  url,
  isLast,
  ...rest
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles(isMobile)();
  const controls = useAnimation();
  const handleMouseEnterControls = () => {
    controls.start("hover");
  };
  const handleMouseLeaveControls = () => {
    controls.start("initial");
  };
  controls.start("initial");

  const displayImage = () =>
    imageUrl ? imageUrl : "images/empty-certificate.jpg";

  const viewAllCard = () => (
    <MuiCard
      className={classes.viewAllCard}
      elevation={2}
      onClick={() => {
        GASendEvent("ViewedAllCertifications");
        navigate("/certificates");
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box mr={1}>
            <Typography variant="h4">View All </Typography>
          </Box>
          <Icon>
            <ArrowForwardIosIcon />
          </Icon>
        </Box>
      </CardContent>
    </MuiCard>
  );

  const certificateCard = () => (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none" }}
    >
      {" "}
      <MuiCard
        className={classes.root}
        elevation={2}
        component={motion.div}
        layoutId={id}
        onMouseEnter={handleMouseEnterControls}
        onMouseLeave={handleMouseLeaveControls}
        {...rest}
      >
        <CardMedia
          component={motion.div}
          layoutId={`img-container-${id}`}
          className={classes.media}
          image={displayImage()}
          title={title}
        />
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            className={classes.title}
            component={motion.h5}
            layoutId={`title-${id}`}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            className={classes.issuedBy}
            component={motion.h5}
            layoutId={`issuedBy-${id}`}
            style={{ flexGrow: 2 }}
          >
            {issuedBy}
          </Typography>
          <Typography
            variant="body2"
            className={classes.footer}
            component={motion.h5}
            layoutId={`footer-${id}`}
            color="primary"
          >
            <span className={classes.type}>{type}</span> &nbsp; &nbsp;{" "}
            {date.month.shortName} {date.year}
          </Typography>
        </CardContent>

        {/* <motion.div
          transition={{ delay: 0.001 }}
          variants={hoverVariants}
          animate={controls}
          className={classes.hover}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition={{ delay: 0.001 }}
            component={motion.div}
            variants={titleVariants}
            animate={controls}
          >
            <Box mr={1}>
              <Typography variant="h4">View Certificate </Typography>
            </Box>
            <Icon
              component={motion.div}
              transition={{
                delay: 0.001,
                repeat: Infinity,
                duration: 1,
                repeatType: "reverse",
              }}
              variants={{ hover: { y: 7 }, initial: { y: -2 } }}
              animate="hover"
            >
              <ArrowForward />
            </Icon>
          </Box>
        </motion.div> */}
      </MuiCard>
    </a>
  );

  const webView = () => (!isLast ? certificateCard() : viewAllCard());

  const mobileView = () => (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none" }}
    >
      {" "}
      <MuiCard
        className={classes.root}
        elevation={0}
        component={motion.div}
        layoutId={id}
        onMouseEnter={handleMouseEnterControls}
        onMouseLeave={handleMouseLeaveControls}
        {...rest}
      >
        <CardMedia
          component={motion.div}
          layoutId={`img-container-${id}`}
          className={classes.media}
          image={displayImage()}
          title={title}
        />
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            paddingInline: "5px",
          }}
        >
          <Typography
            variant="h5"
            className={classes.title}
            component={motion.h5}
            layoutId={`title-${id}`}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            className={classes.issuedBy}
            component={motion.h5}
            layoutId={`issuedBy-${id}`}
            style={{ flexGrow: 2 }}
          >
            {issuedBy}
          </Typography>
        </CardContent>
      </MuiCard>
    </a>
  );

  return isMobile ? mobileView() : webView();
};

const useStyles = (isMobile) =>
  makeStyles((theme) => ({
    root: {
      position: "relative",
      height: isMobile ? "100%" : 430,
      borderRadius: "8px",
      overflow: "hidden",
      cursor: "pointer",
      transition: "transform 0.5s ease",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    },
    media: {
      height: 220,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      overflow: "hidden",
      borderRadius: isMobile ? "8px" : "0px",
    },
    title: {
      fontSize: "18px",
      fontWeight: 550,
      color: theme.palette.text.secondary,
      display: "-webkit-box",
      "-webkit-line-clamp": 3,
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    issuedBy: {
      fontSize: "18px",
      marginBottom: theme.spacing(1),
      color: theme.palette.primary.main,
    },
    footer: {
      fontSize: "14px",
      color: theme.palette.text.secondary,
      position: "absolute",
      bottom: "20px",
    },
    type: {
      padding: "3px 10px",
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    hover: {
      position: "absolute",
      top: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    viewAllCard: {
      height: 430,
      width: 300,
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.text.secondary,
      cursor: "pointer",
      transition: "transform 0.5s ease",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    },
    viewAllText: {
      color: theme.palette.primary.contrastText,
    },
  }));

export default Card;
