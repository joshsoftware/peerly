import React from "react";
import PropTypes from "prop-types";
import RecognitionByComponent from "./recognitionByComponent";
import RecognitionTextComponent from "./recognitionTextComponent";

const RecognitionCardBodyComponent = (props) => {
  const { recognition_by, recognition_text } = props;
  return (
    <div>
      <RecognitionTextComponent
        divClassNameRecognitionText="rounded border border-dark mt-3"
        recognition_text={recognition_text}
      />
      <RecognitionByComponent
        recognition_by={recognition_by}
        divClassNameRecognitionBy="d-flex justify-content-end"
        labelClassNameRecognitionBy="font-weight-bold"
        imageClassName="rounded"
      />
    </div>
  );
};
RecognitionCardBodyComponent.propTypes = {
  recognition_by: PropTypes.object.isRequired,
  recognition_text: PropTypes.string.isRequired,
};
export default RecognitionCardBodyComponent;
