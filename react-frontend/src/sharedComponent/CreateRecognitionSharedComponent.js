import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import ButtonCoreComponent from "../coreComponents/ButtonCoreComponent";
import ImageCoreComponent from "../coreComponents/ImageCoreComponent";
import LabelCoreComponent from "../coreComponents/LabelCoreComponent";
const CreateRecognitionSharedComponent = (props) => {
  const {
    src,
    imgClassName,
    buttonclassName,
    type,
    value,
    variant,
    size,
    labelName,
    labelClassName,
  } = props;

  return (
    <Card>
      <Card.Header>
        <ImageCoreComponent src={src} className={imgClassName} />
        <LabelCoreComponent labelName={labelName} className={labelClassName} />
      </Card.Header>
      <ButtonCoreComponent
        className={buttonclassName}
        type={type}
        value={value}
        variant={variant}
        size={size}
      />
      <Card.Body></Card.Body>
    </Card>
  );
};

CreateRecognitionSharedComponent.propTypes = {
  src: PropTypes.string.isRequired,
  imgClassName: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  buttonclassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
};

export default CreateRecognitionSharedComponent;
