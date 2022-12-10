import React from "react";
import SectionContainer from "../../containers/SectionContainer";
import Tabs from "../../components/Tabs/Tabs";
import { useSelector, useDispatch } from "react-redux";
import { fetchExperienceThunk } from "../../redux/slices/experienceSlice";
import TryAgain from "../../components/TryAgain";

const Experience = () => {
  const dispatch = useDispatch();
  const { experienceList, isLoading } = useSelector(
    (state) => state.experience
  );
  
  async function getExperienceData() {
    try {
      await dispatch(fetchExperienceThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const buildContent = () =>
    experienceList.length == 0 ? (
      <TryAgain
        message="Unable to fetch experience list!"
        callback={getExperienceData}
      />
    ) : (
      <Tabs experienceData={experienceList} />
    );
  return (
    <SectionContainer
      id="experience"
      title="Experience"
      maxWidth="sm"
      padding="120"
      reverse
    >
      {isLoading ? <p>Loading...</p> : buildContent()}
    </SectionContainer>
  );
};

export default Experience;
