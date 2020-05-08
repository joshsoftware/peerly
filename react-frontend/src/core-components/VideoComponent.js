import React from "react";
import PropTypes from "prop-types";

const VideoComponent = ({ className, src, controls, height, width }) => (
  <video
    className={className}
    src={src}
    controls={controls}
    height={height}
    width={width}
  />
);

VideoComponent.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  controls: PropTypes.oneOf(["controls"]),
  height: PropTypes.number,
  width: PropTypes.number,
};

VideoComponent.defaultProps = {
  controls: "controls",
};

export default VideoComponent;
