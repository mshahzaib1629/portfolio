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
import { projectList } from "../../data";
import { useTranslation } from "react-i18next";

const ProjectsGallery = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const getSelected = (id) => projectList.find((elem) => elem.id === id);

  function loadProjects() {
    const startIndex = pageNo * pageSize;
    const endIndex = startIndex + pageSize;
    let newProjects = projectList.filter((value, index) => {
      return index >= startIndex && index < endIndex;
    });
    setLoadedProjects((prevProjects) => [...prevProjects, ...newProjects]);
    setPageNo((prevPageNo) => prevPageNo + 1);
  }

  useEffect(() => {
    if (isMobile) setPageSize(3);
    loadProjects();
  }, []);

  console.log('loadedProjects after pageNo: ', pageNo,' pageSize: ', pageSize);
  console.log(loadedProjects);
  return (
    <>
      <AnimateSharedLayout type="crossfade">
        <Grid container spacing={4} className={classes.galleryContainer}>
          {loadedProjects.map((item, k) => (
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
                overview={t(`projects_${item.id}_overview`)}
                backgroundImage={item.backgroundImage}
                frontImage={item.frontImage}
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
              overview={t(`projects_${selectedId}_extended_overview`)}
              backgroundImage={getSelected(selectedId).backgroundImage}
              frontImage={getSelected(selectedId).frontImage}
              technologies={getSelected(selectedId).technologies}
              handleClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
      {loadedProjects.length < projectList.length && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            className={classes.loadBtn}
            onClick={loadProjects}
            variant="contained"
            color="primary"
          >
            {t("project_load_btn")}
          </Button>
        </Box>
      )}
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
