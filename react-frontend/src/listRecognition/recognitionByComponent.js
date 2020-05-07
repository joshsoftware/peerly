import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";
import ImageComponent from "./imageComponent";

const RecognitionByComponent = (props) => {
  const { recognition_by, labelClassNameRecognitionBy, imageClassName } = props;
  return (
    <div className="d-flex justify-content-end">
      <LabelComponent
        labelText={recognition_by.name}
        className={labelClassNameRecognitionBy}
      />
      <ImageComponent src={recognition_by.image} className={imageClassName} />
    </div>
  );
};

RecognitionByComponent.propTypes = {
  recognition_by: PropTypes.object.isRequired,
  labelClassNameRecognitionBy: PropTypes.string,
  imageClassName: PropTypes.string,
};

export default RecognitionByComponent;
