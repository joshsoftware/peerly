import React from "react";
import PropTypes from "prop-types";

const VideoComponent = ({ className, src, controls }) => (
  <video className={className} src={src} controls={controls} />
);

VideoComponent.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  controls: PropTypes.oneOf(["controls"]),
};

export default VideoComponent;
