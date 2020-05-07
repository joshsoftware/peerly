import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import ImageComponent from "./imageComponent";

const HighFiveButtonComponent = (props) => {
  const {
    onClickEvent,
    src,
    imageClassName,
    buttonClassName,
    highFiveIncrement,
  } = props;

  return (
    <Button className={buttonClassName} onClick={onClickEvent}>
      {highFiveIncrement}
      <ImageComponent src={src} className={imageClassName} />
    </Button>
  );
};

HighFiveButtonComponent.propTypes = {
  onClickEvent: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  imageClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  highFiveIncrement: PropTypes.string.isRequired,
};

export default HighFiveButtonComponent;
