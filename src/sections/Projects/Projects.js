import React from "react";
import SectionContainer from "../../containers/SectionContainer";
import ProjectsGallery from "../../components/ProjectsGallery";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Projects = () => {
  const { t } = useTranslation();

  const { projectList, isLoading } = useSelector((state) => state.project);
  return (
    <SectionContainer id="projects" title={t("menu_projects")} maxWidth="md">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ProjectsGallery projectsData={projectList} />
      )}
    </SectionContainer>
  );
};

export default Projects;
