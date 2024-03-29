import React, { useState, useEffect } from "react";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import {
  Grid,
  makeStyles,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Card from "./Card";
import ExtendedCard from "./ExtendedCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { GASendEvent } from "../../utils/googleAnalytics";

const ProjectsGallery = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const getSelected = (id) => props.projectsData.find((elem) => elem.id === id);

  return (
    <>
      <AnimateSharedLayout type="crossfade">
        <Grid container spacing={3}>
          {props.projectsData.map((project, index) => (
            <ProjectCard project={project} index={index} />
          ))}
        </Grid>

        <AnimatePresence>
          {selectedId && (
            <ExtendedCard
              key={selectedId}
              id={selectedId}
              title={getSelected(selectedId).title}
              overview={getSelected(selectedId).overview}
              imageUrl={getSelected(selectedId).imageUrl}
              technologies={getSelected(selectedId).technologies}
              handleClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </AnimateSharedLayout>

      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          className={classes.loadBtn}
          onClick={() => {
            GASendEvent("ViewedAllProjects");
            navigate("/projects");
          }}
          variant="outlined"
          color="primary"
        >
          View All &nbsp;
          <ArrowForwardIosIcon fontSize="small" />
        </Button>
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  galleryContainer: {
    overflow: "visible",
    width: "100%",
    margin: "0 auto",
  },
  item: {
    overflow: "visible",
  },
  loadBtn: {
    width: "200px",
    fontSize: "20px",
  },
}));

export default ProjectsGallery;
