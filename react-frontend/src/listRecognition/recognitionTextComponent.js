import React from "react";
import PropTypes from "prop-types";
import "@reach/menu-button/styles.css";
import LabelComponent from "../core-component/lableComponent";
import ImageComponent from "./imageComponent";

const RecognitionTextComponent = (props) => {
  const { recognition_by, recognition_text } = props;
  return (
    <div className="d-flex flex-column">
      <LabelComponent
        labelText={recognition_text}
        className="font-weight-bold font-italic border border-secondary"
      />
      <div className="d-flex justify-content-end">
        <LabelComponent
          labelText={recognition_by.name}
          className="ml-1 font-weight-bold "
        />
        <ImageComponent src={recognition_by.image} className="roundedCircle" />
      </div>
    </div>
  );
};

RecognitionTextComponent.propTypes = {
  recognition_by: PropTypes.object.isRequired,
  recognition_text: PropTypes.string.isRequired,
};
export default RecognitionTextComponent;
