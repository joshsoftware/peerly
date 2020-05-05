import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyImageComponent = (props) => {
  const { className, height, width, src, alt } = props;

  return (
    <Image
      className={className}
      height={height}
      width={width}
      src={src}
      alt={alt}
    />
  );
};

PeerlyImageComponent.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  src: PropTypes.any,
  alt: PropTypes.string,
};

PeerlyImageComponent.defaultProps = {
  alt: "Peerly Image",
};

export default PeerlyImageComponent;
