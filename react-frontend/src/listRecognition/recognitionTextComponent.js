import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";

const RecognitionTextComponent = (props) => {
  const {
    lableClassNameRecognitionText,
    recognition_text,
    divClassNameRecognitionText,
  } = props;
  return (
    <div className={divClassNameRecognitionText}>
      <LabelComponent
        labelText={recognition_text}
        className={lableClassNameRecognitionText}
      />
    </div>
  );
};

RecognitionTextComponent.propTypes = {
  recognition_text: PropTypes.string.isRequired,
  lableClassNameRecognitionText: PropTypes.string,
  divClassNameRecognitionText: PropTypes.string,
};
export default RecognitionTextComponent;
