import React from "react";
import PropTypes from "prop-types";
import "@reach/menu-button/styles.css";
import LabelComponent from "../core-component/lableComponent";
import ImageComponent from "./imageComponent";
import MenuButtonComponent from "./menuButtonComponent";

const RecognitionProfileComponent = (props) => {
  const { recognition_for, core_value, recognition_on } = props;
  return (
    <div>
      <div className="d-flex justify-content-end">
        <MenuButtonComponent />
      </div>
      <div className="d-flex justify-content-left">
        <ImageComponent src={recognition_for.image} shape="roundedCircle" />
        <div className="d-flex flex-column text-left">
          <LabelComponent
            labelText={recognition_for.name}
            className="font-weight-bold"
          />
          <div className="d-flex justify-content-start ">
            <LabelComponent labelText="got high-five for" />
            <LabelComponent
              labelText={core_value}
              className="ml-1 font-weight-bold"
            />
          </div>
          <LabelComponent labelText={recognition_on} className="text-muted" />
        </div>
      </div>
    </div>
  );
};

RecognitionProfileComponent.propTypes = {
  recognition_for: PropTypes.object.isRequired,
  core_value: PropTypes.string.isRequired,
  recognition_on: PropTypes.string.isRequired,
};
export default RecognitionProfileComponent;
