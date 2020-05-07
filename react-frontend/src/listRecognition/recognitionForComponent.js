import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";
import ImageComponent from "../core-component/imageComponent";

const RecognitionForComponent = (props) => {
  const {
    recognition_for,
    labelClassNameRecognitionFor,
    imageClassName,
    divClassNameRecognitionBy,
  } = props;
  return (
    <div className={divClassNameRecognitionBy}>
      <ImageComponent src={recognition_for.image} className={imageClassName} />
      <LabelComponent
        labelText={recognition_for.name}
        className={labelClassNameRecognitionFor}
      />
    </div>
  );
};

RecognitionForComponent.propTypes = {
  recognition_for: PropTypes.object.isRequired,
  labelClassNameRecognitionFor: PropTypes.string,
  imageClassName: PropTypes.string,
  divClassNameRecognitionBy: PropTypes.string,
};

export default RecognitionForComponent;
