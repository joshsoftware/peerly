import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";

const RecognitionOnComponent = (props) => {
  const { lableClassNameRecognitionOn, recognition_on } = props;
  return (
    <LabelComponent
      labelText={recognition_on}
      className={lableClassNameRecognitionOn}
    />
  );
};

RecognitionOnComponent.propTypes = {
  recognition_on: PropTypes.string.isRequired,
  lableClassNameRecognitionOn: PropTypes.string,
};
export default RecognitionOnComponent;
