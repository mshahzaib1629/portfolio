import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Icon,
  Box,
} from "@material-ui/core";
import { ArrowDownward } from "@material-ui/icons";
import { motion, useAnimation } from "framer-motion";

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
  colorGradients,
  frontImage,
  overview,
  technologies,
  onClick,
  ...rest
}) => {
  const classes = useStyles({ colorGradients });
  const controls = useAnimation();
  const handleMouseEnterControls = () => {
    controls.start("hover");
  };
  const handleMouseLeaveControls = () => {
    controls.start("initial");
  };
  controls.start("initial");

  const displayImage = () =>
    frontImage ? frontImage : "images/empty-project-image1.jpg";

  return (
    <MuiCard
      className={classes.root}
      elevation={10}
      component={motion.div}
      layoutId={id}
      onMouseEnter={handleMouseEnterControls}
      onMouseLeave={handleMouseLeaveControls}
      onClick={() => onClick()}
      {...rest}
    >
      <div>
        <CardMedia
          component={motion.div}
          layoutId={`img-container-${id}`}
          className={classes.media}
          image={displayImage()}
          title={title}
        >
        </CardMedia>
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
            noWrap={true}
            component={motion.h5}
            layoutId={`title-${id}`}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            className={classes.overview}
            component={motion.h5}
            layoutId={`overview-${id}`}
            style={{ flexGrow: 2 }}
          >
            {overview}
          </Typography>
          <Typography
            variant="body2"
            className={classes.technologies}
            component={motion.h5}
            layoutId={`technologies-${id}`}
            color="primary"
          >
            {technologies.join(" · ")}
          </Typography>
        </CardContent>
      </div>
      <motion.div
        transition={{ delay: 0.15 }}
        variants={hoverVariants}
        animate={controls}
        className={classes.hover}
      >
        <Box
          display="flex"
          alignItems="center"
          justofyContent="center"
          transition={{ delay: 0.3 }}
          component={motion.div}
          variants={titleVariants}
          animate={controls}
        >
          <Box mr={1}>
            <Typography variant="h4">View project </Typography>
          </Box>
          <Icon
            component={motion.div}
            transition={{
              delay: 0.3,
              repeat: Infinity,
              duration: 1,
              repeatType: "reverse",
            }}
            variants={{ hover: { y: 7 }, intial: { y: -2 } }}
            animate="hover"
          >
            <ArrowDownward />
          </Icon>
        </Box>
      </motion.div>
    </MuiCard>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: 350,
    overflow: "hidden",
    cursor: "pointer",
    backgroundColor: theme.palette.background.paper,
  },

  media: {
    height: 200,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "hidden",
    backgroundColor: "red",
  },
  frontImage: {
    marginTop: "20px",
    objectFit: "fill",
    objectPosition: "center top",
    width: "90%",
    boxShadow: theme.shadows[8],
  },
  title: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.contrastText,
  },
  overview: {
    fontSize: "15px",
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.contrastText,
  },
  technologies: {
    fontSize: "14px",
    color: theme.palette.primary.contrastText,
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
}));

export default Card;
