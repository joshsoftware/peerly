import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";

const RecognitionCoreValueComponent = (props) => {
  const {
    lableClassNameRecognitionCoreValue,
    core_value,
    highFiveText,
  } = props;
  return (
    <div>
      {highFiveText}
      <LabelComponent
        labelText={core_value}
        className={lableClassNameRecognitionCoreValue}
      />
    </div>
  );
};

RecognitionCoreValueComponent.propTypes = {
  core_value: PropTypes.string.isRequired,
  lableClassNameRecognitionCoreValue: PropTypes.string,
  highFiveText: PropTypes.string,
};
export default RecognitionCoreValueComponent;
