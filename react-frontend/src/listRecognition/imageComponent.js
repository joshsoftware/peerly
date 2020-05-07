import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";
const ImageComponent = (props) => {
  const { src, className } = props;
  return <Image src={src} className={className} />;
};

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ImageComponent;
