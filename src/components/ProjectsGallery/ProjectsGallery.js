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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
        <Grid container spacing={4} className={classes.galleryContainer}>
          {props.projectsData.map((item, k) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
              classes={{ item: classes.item }}
            >
              <Card
                id={item.id}
                title={item.title}
                overview={item.overview}
                frontImage={item.imageUrl}
                technologies={item.technologies}
                onClick={() => setSelectedId(item.id)}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
              />
            </Grid>
          ))}
        </Grid>
        <AnimatePresence>
          {selectedId && (
            <ExtendedCard
              key={selectedId}
              id={selectedId}
              title={getSelected(selectedId).title}
              overview={getSelected(selectedId).extendedOverview}
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
          onClick={() => {navigate('/projects')}}
          variant="contained"
          color="primary"
        >
          View All
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
  },
}));

export default ProjectsGallery;
