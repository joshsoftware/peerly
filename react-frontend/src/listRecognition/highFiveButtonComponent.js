import React from "react";
import "@reach/menu-button/styles.css";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import ImageComponent from "./imageComponent";

const HighFiveButtonComponent = (props) => {
  const {
    onClickEvent,
    imageIcon,
    imageShape,
    buttonClassName,
    highFiveIncrement,
  } = props;

  return (
    <Button className={buttonClassName} onClick={onClickEvent}>
      {highFiveIncrement}
      <ImageComponent src={imageIcon} shape={imageShape} />
    </Button>
  );
};

HighFiveButtonComponent.propTypes = {
  onClickEvent: PropTypes.func.isRequired,
  imageIcon: PropTypes.string.isRequired,
  imageShape: PropTypes.string.isRequired,
  buttonClassName: PropTypes.string,
  highFiveIncrement: PropTypes.string.isRequired,
};

export default HighFiveButtonComponent;
