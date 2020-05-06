import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";

const ImageComponent = ({ className, height, width, src, alt }) => (
  <Image
    className={className}
    height={height}
    width={width}
    src={src}
    alt={alt}
  />
);

ImageComponent.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ImageComponent;
