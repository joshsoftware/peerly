import React from "react";
import PropTypes from "prop-types";
import "@reach/menu-button/styles.css";
import LabelComponent from "../core-component/lableComponent";
import ImageComponent from "./imageComponent";

const RecognitionProfileComponent = (props) => {
  const { recognition_for, core_value, time } = props;
  return (
    <div className="d-flex justify-content-left">
      <ImageComponent img={recognition_for.image} shape="roundedCircle" />
      <div className="d-flex flex-column text-left">
        <LabelComponent
          labelText={recognition_for.name}
          className="font-weight-bold"
        />
        <div className="d-flex">
          <LabelComponent labelText="got high-five for" />
          <LabelComponent
            labelText={core_value}
            className="ml-1 font-weight-bold"
          />
        </div>
        <LabelComponent labelText={time} />
      </div>
    </div>
  );
};

RecognitionProfileComponent.propTypes = {
  recognition_for: PropTypes.object.isRequired,
  core_value: PropTypes.object.isRequired,
  time: PropTypes.object.isRequired,
};
export default RecognitionProfileComponent;
