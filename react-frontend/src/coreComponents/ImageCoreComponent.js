import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";

const ImageCoreComponent = ({ className, height, width, src, alt }) => (
  <Image
    className={className}
    height={height}
    width={width}
    src={src}
    alt={alt}
  />
);

ImageCoreComponent.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  alt: PropTypes.string,
};

export default ImageCoreComponent;
