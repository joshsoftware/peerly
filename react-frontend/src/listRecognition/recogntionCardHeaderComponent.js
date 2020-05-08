import React from "react";
import PropTypes from "prop-types";
import ImageComponent from "../core-component/imageComponent";

import LabelComponent from "core-component/lableComponent";
import MenuButtonComponent from "./menuButtonComponent";
import RecognitionCoreValueComponent from "./recognitionCoreValueComponent";
import RecognitionOnComponent from "./recogntionOnComponent";

const RecognitionCardHeaderComponent = (props) => {
  const { recognition_on, recognition_for, core_value, highFiveText } = props;
  return (
    <div>
      <div className="d-flex justify-content-end">
        <MenuButtonComponent ClassName="bg-light grey text-dark btn-outline-light grey" />
      </div>
      <div className="d-flex  flex-column-left">
        <ImageComponent
          src={recognition_for.image}
          className="rounded-circle"
        />
        <div className="d-flex  flex-column text-left">
          <LabelComponent
            labelText={recognition_for.name}
            className="font-weight-bold"
          />
          <RecognitionCoreValueComponent
            core_value={core_value}
            highFiveText={highFiveText}
            className="font-weight-bold ml-1"
          />
          <RecognitionOnComponent
            recognition_on={recognition_on}
            className="text-muted"
          />
        </div>
      </div>
    </div>
  );
};
RecognitionCardHeaderComponent.propTypes = {
  recognition_for: PropTypes.object.isRequired,
  recognition_on: PropTypes.string.isRequired,
  core_value: PropTypes.string.isRequired,
  highFiveText: PropTypes.string.isRequired,
};
export default RecognitionCardHeaderComponent;
