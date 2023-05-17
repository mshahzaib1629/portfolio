import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkIcon from "@material-ui/icons/Link";
import { useTheme } from "@material-ui/core";

const ProjectCard = ({ projects }) => {
  const theme = useTheme();
  const classes = useStyles();

  const displayImage = (frontImage) =>
    frontImage ? frontImage : "images/empty-project-image1.jpg";

  const displayImageGrid = (project) => (
    <Grid item xs={4}>
      <CardMedia
        className={classes.media}
        layoutId={`img-container-${project.id}`}
        image={displayImage(project.imageUrl)}
        title={project.title}
      />
    </Grid>
  );

  const displayContentGrid = (project) => (
    <Grid item xs={8}>
      <Card className={classes.content}>
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
            <IconButton aria-label="project-link">
              <LinkIcon style={{ color: theme.palette.text.secondary }} />
            </IconButton>
            <IconButton aria-label="github-link">
              <GitHubIcon style={{ color: theme.palette.text.secondary }} />
            </IconButton>
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
              {tech}{" "}
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
  return (
    <Grid container spacing={3}>
      {projects.map((project, index) => {
        console.log("project: ", project);
        return (
          <Grid item xs={12} key={index}>
            <Grid container className={classes.root}>
              {displayContentGrid(project)}
              {displayImageGrid(project)}
            </Grid>
          </Grid>
        );
      })}
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
  media: {
    width: "100%",
    height: "300px", // Add a height that works for you
    boxSizing: "border-box",
    padding: "10px",
    borderRadius: "8px",
    margin: "2px 10px",
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
}));
export default ProjectCard;
