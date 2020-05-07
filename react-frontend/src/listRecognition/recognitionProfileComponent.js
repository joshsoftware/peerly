import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../core-component/lableComponent";
import ImageComponent from "./imageComponent";
import MenuButtonComponent from "./menuButtonComponent";

const RecognitionProfileComponent = (props) => {
  const {
    recognition_for,
    core_value,
    recognition_on,
    imageShape,
    highFiveText,
    labelClassNameRecognitionOn,
    labelClassNameRecognitionFor,
    labelClassNameCoreValue,
  } = props;
  return (
    <div>
      <div className="d-flex justify-content-end">
        <MenuButtonComponent />
      </div>
      <div className="d-flex justify-content-left">
        <ImageComponent src={recognition_for.image} imageShape={imageShape} />
        <div className="d-flex flex-column text-left">
          <LabelComponent
            labelText={recognition_for.name}
            className={labelClassNameRecognitionFor}
          />
          <div className="d-flex justify-content-start ">
            <LabelComponent labelText={highFiveText} />
            <LabelComponent
              labelText={core_value}
              className={labelClassNameCoreValue}
            />
          </div>
          <LabelComponent
            labelText={recognition_on}
            className={labelClassNameRecognitionOn}
          />
        </div>
      </div>
    </div>
  );
};

RecognitionProfileComponent.propTypes = {
  recognition_for: PropTypes.object.isRequired,
  core_value: PropTypes.string.isRequired,
  recognition_on: PropTypes.string.isRequired,
  imageShape: PropTypes.string,
  highFiveText: PropTypes.string.isRequired,
  labelClassNameCoreValue: PropTypes.string,
  labelClassNameRecognitionFor: PropTypes.string,
  labelClassNameRecognitionOn: PropTypes.string,
};
export default RecognitionProfileComponent;
