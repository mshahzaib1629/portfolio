import React from "react";
import SectionContainer from "../../containers/SectionContainer";
import Tabs from "../../components/Tabs/Tabs";
import { useSelector, useDispatch } from "react-redux";

const Experience = () => {
  const { experienceList, isLoading } = useSelector(
    (state) => state.experience
  );
  return (
    <SectionContainer
      id="experience"
      title="Experience"
      maxWidth="sm"
      padding="120"
      reverse
    >
      {isLoading ? <p>Loading...</p> : <Tabs experienceData={experienceList} />}
    </SectionContainer>
  );
};

export default Experience;
