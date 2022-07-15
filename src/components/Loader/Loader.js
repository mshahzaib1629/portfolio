import React from "react";
import LoaderContainer from "../../containers/LoaderContainer";
import Mehdi from "../../assets/images/Mehdi.js";

const Loader = () => {
  return (
    <LoaderContainer>
      {/* <Mehdi width={250} /> */}

      <img
        src="images/shahzaib-splash.gif"
        alt="Shahzaib Minhas"
        width={250}
      />
    </LoaderContainer>
  );
};

export default Loader;
