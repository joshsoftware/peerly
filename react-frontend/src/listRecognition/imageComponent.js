import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";
const ImageComponent = (img, shape) => {
  <Image src={require("./" + img)} className={shape} />;
};
ImageComponent.propTypes = {
  img: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
};
export default ImageComponent;
