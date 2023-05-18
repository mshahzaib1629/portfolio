import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkIcon from "@material-ui/icons/Link";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { getPaletteFromImage } from "react-palette";
import { Launch } from "@material-ui/icons";

const ProjectCard = ({ project, index }) => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const displayImage = (frontImage) =>
    frontImage ? frontImage : "images/empty-project-image1.jpg";

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
          {project.extendedOverview}
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
      <Card className={classes.content} elevation={2}>
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
          {project.extendedOverview}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          align="right"
          className={classes.technologies}
        >
          {project.technologies.map((tech, index) => (
            <span>
              <span>{tech} </span>
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
