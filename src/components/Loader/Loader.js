import React from "react";
import LoaderContainer from "../../containers/LoaderContainer";
import Mehdi from "../../assets/images/Mehdi.js";
import MovingComponent from "react-moving-text";

const Loader = () => {
  return (
    <LoaderContainer>
      <MovingComponent
        type="fadeIn"
        duration="1600ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="1"
        fillMode="none"
      >
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Edu SA Beginner",
            fontSize: 48,
            color: "white",
            lineHeight: 1.2,
          }}
        >
          Shahzaib <br />
          Minhas
        </h1>
      </MovingComponent>
    </LoaderContainer>
  );
};

export default Loader;
