import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";

const RecognitionTextComponent = (props) => {
  const { lableClassNameRecognitionText, recognition_text } = props;
  return (
    <div>
      <LabelComponent
        labelText={recognition_text}
        className={lableClassNameRecognitionText}
      />
    </div>
  );
};

RecognitionTextComponent.propTypes = {
  recognition_by: PropTypes.object.isRequired,
  recognition_text: PropTypes.string.isRequired,
  lableClassNameRecognitionText: PropTypes.string,
};
export default RecognitionTextComponent;
