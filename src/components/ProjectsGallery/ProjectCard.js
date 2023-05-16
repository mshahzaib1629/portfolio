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

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  media: {
    width: "100%",
    height: "300px", // Add a height that works for you
    boxSizing: "border-box",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    boxSizing: "border-box",
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
});

const ProjectCard = ({ projects }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {projects.map((project, index) => {
        console.log("project: ", project);
        return (
          <Grid item xs={12} key={index}>
            <Grid container className={classes.root}>
              <Grid item xs={9}>
                <Card className={classes.content}>
                  <CardActionArea>
                    <div className={classes.projectDetails}>
                      <div>
                        <Typography variant="h5" component="h2">
                          {project.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {project.workedAt}
                        </Typography>
                      </div>
                      <div className={classes.icons}>
                        <IconButton aria-label="project-link">
                          <LinkIcon />
                        </IconButton>
                        <IconButton aria-label="github-link">
                          <GitHubIcon />
                        </IconButton>
                      </div>
                    </div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="justify"
                    >
                      {project.overview}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="right"
                      className={classes.technologies}
                    >
                      {project.technologies}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <CardMedia
                  className={classes.media}
                  layoutId={`img-container-${project.id}`}
                  image={
                    "https://www.carscoops.com/wp-content/uploads/2023/02/2022-Mercedes-CLS-1024x576.jpg"
                  }
                  title={project.title}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProjectCard;
