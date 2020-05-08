import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";

const RecognitionOnComponent = (props) => {
  const { className, recognition_on } = props;
  return <LabelComponent labelText={recognition_on} className={className} />;
};

RecognitionOnComponent.propTypes = {
  recognition_on: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default RecognitionOnComponent;
