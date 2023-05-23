import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Launch } from "@material-ui/icons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Collapse from "@material-ui/core/Collapse";

const ProjectCard = ({ project, index }) => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [expanded, setExpanded] = useState(false);

  const displayImage = (frontImage) =>
    frontImage ? frontImage : "images/empty-project-image1.jpg";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const displayImageGrid = () => (
    <Grid item xs={4}>
      <CardMedia
        className={classes.media}
        layoutId={`img-container-${project.id}`}
        image={displayImage(project.imageUrl)}
        title={project.title}
        elevation={2}
      />
    </Grid>
  );

  const displayContentGrid = () => (
    <Grid item md={8}>
      <Card className={classes.content} elevation={2}>
        <div className={classes.projectDetails}>
          <div>
            <Typography
              variant="h5"
              style={{ color: theme.palette.text.secondary }}
            >
              {project.title}{" "}
              {project.projectType && (
                <>
                  {"  "} -{" "}
                  <span
                    style={{ color: theme.palette.text.secondary }}
                    variant="h5"
                  >
                    {project.projectType}
                  </span>
                </>
              )}
            </Typography>
            {project.workedAt && project.workedAt != "-" && (
              <Typography
                variant="h5"
                style={{ color: theme.palette.text.secondary }}
              >
                @{" "}
                <span style={{ color: theme.palette.primary.main }}>
                  {project.workedAt}
                </span>
              </Typography>
            )}
          </div>
          <div className={classes.icons}>
            {project.links?.url && (
              <IconButton
                aria-label="project-link"
                onClick={() => window.open(project.links?.url, "_blank")}
              >
                <Launch style={{ color: theme.palette.text.secondary }} />
              </IconButton>
            )}
            {project.links.code && (
              <IconButton
                aria-label="github-link"
                onClick={() => window.open(project.links?.code, "_blank")}
              >
                <GitHubIcon style={{ color: theme.palette.text.secondary }} />
              </IconButton>
            )}
          </div>
        </div>
        <Typography variant="body2" color="textSecondary" align="justify">
          {project.overview}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          align="right"
          className={classes.technologies}
        >
          {project.technologies.map((tech, index) => (
            <span>
              <span className={classes.techItem}> {tech} </span>
              {index != project.technologies.length - 1 ? (
                <>&nbsp;○ &nbsp;</>
              ) : (
                ""
              )}
            </span>
          ))}
        </Typography>
      </Card>
    </Grid>
  );

  const displayMobileCard = () => (
    <Grid item sx={12}>
      <Card className={classes.mobileContent} elevation={2}>
        <div className={classes.projectDetails}>
          <div>
            <Typography
              variant="h5"
              style={{ color: theme.palette.text.secondary }}
            >
              {project.title}
            </Typography>
            {project.workedAt && project.workedAt != "-" && (
              <Typography
                variant="h5"
                style={{ color: theme.palette.text.secondary }}
              >
                @{" "}
                <span style={{ color: theme.palette.primary.main }}>
                  {project.workedAt}
                </span>
              </Typography>
            )}
          </div>
          <div className={classes.icons}>
            {project.links?.url && (
              <IconButton
                aria-label="project-link"
                onClick={() => window.open(project.links?.url, "_blank")}
              >
                <Launch style={{ color: theme.palette.text.secondary }} />
              </IconButton>
            )}
            {project.links.code && (
              <IconButton
                aria-label="github-link"
                onClick={() => window.open(project.links?.code, "_blank")}
              >
                <GitHubIcon style={{ color: theme.palette.text.secondary }} />
              </IconButton>
            )}
          </div>
        </div>
        <br />
        <Typography variant="body2" color="textSecondary" align="justify">
          {project.overview}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          align="right"
          className={classes.technologies}
        >
          <span
            className={classes.techItem}
            onClick={handleExpandClick}
            style={{ color: theme.palette.primary.main, cursor: "pointer" }}
          >
            Technologies{" "}
            {expanded ? (
              <KeyboardArrowUpIcon
                style={{ fontSize: "1rem", marginLeft: "0.2rem" }}
              />
            ) :(
              <KeyboardArrowDownIcon
                style={{ fontSize: "1rem", marginLeft: "0.2rem" }}
              />
            ) }
          </span>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {project.technologies.map((tech, index) => (
              <span key={index}>
                <span>{tech}</span>
                {index !== project.technologies.length - 1 ? ", " : ""}
              </span>
            ))}
          </Collapse>
        </Typography>
      </Card>
    </Grid>
  );
  const webView = () => (
    <Grid container className={classes.root}>
      {displayContentGrid()}
      {displayImageGrid()}
    </Grid>
  );

  const mobileView = () => (
    <Grid container className={classes.rootMobile}>
      {displayMobileCard()}
    </Grid>
  );

  return (
    <Grid item xs={12} key={index}>
      {isMobile ? mobileView() : webView()}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 10px",
  },
  rootMobile: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  media: {
    width: "100%",
    height: "300px",
    boxSizing: "border-box",
    padding: "10px",
    borderRadius: "8px",
    margin: "2px 10px",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.04)",
      // transform: "translateY(-5px)",
    },
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    boxSizing: "border-box",
    borderRadius: "8px",
    padding: "30px 30px",
    transition: "transform 0.5s ease",
    "&:hover": {
      // transform: "scale(1.04)",
      transform: "translateY(-5px)",
    },
  },
  mobileContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    boxSizing: "border-box",
    borderRadius: "8px",
    padding: "30px 30px",
  },
  projectDetails: {
    display: "flex",
    justifyContent: "space-between",
  },
  technologies: {
    alignSelf: "flex-end",
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  techItem: {
    transition: "color 0.2s ease",
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
}));
export default ProjectCard;
