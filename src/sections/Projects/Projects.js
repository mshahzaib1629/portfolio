import React from "react";
import SectionContainer from "../../containers/SectionContainer";
import ProjectsGallery from "../../components/ProjectsGallery";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeaturedProjectThunk } from "../../redux/slices/projectSlice";
import TryAgain from "../../components/TryAgain";

const Projects = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { projectList, isLoading } = useSelector((state) => state.project);

  async function getProjectData() {
    try {
      await dispatch(fetchFeaturedProjectThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const buildContent = () =>
    projectList.length == 0 ? (
      <TryAgain message="Unable to fetch projects!" callback={getProjectData} />
    ) : (
      <ProjectsGallery projectsData={projectList} />
    );

  return (
    <SectionContainer id="projects" title={t("menu_projects")} maxWidth="md">
      {isLoading ? <p>Loading...</p> : buildContent()}
    </SectionContainer>
  );
};

export default Projects;
