import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";

const RecognitionCoreValueComponent = (props) => {
  const { className, core_value, highFiveText } = props;
  return (
    <div>
      {highFiveText}
      <LabelComponent labelText={core_value} className={className} />
    </div>
  );
};

RecognitionCoreValueComponent.propTypes = {
  core_value: PropTypes.string.isRequired,
  className: PropTypes.string,
  highFiveText: PropTypes.string.isRequired,
};
export default RecognitionCoreValueComponent;
