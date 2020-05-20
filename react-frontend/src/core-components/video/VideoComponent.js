import React from "react";
import PropTypes from "prop-types";

const VideoComponent = ({ className, src, controls, height, width, title }) => (
  /*eslint-disable-next-line jsx-a11y/media-has-caption */
  <video
    title={title}
    className={className}
    src={src}
    controls={controls}
    height={height}
    width={width}
  />
);

VideoComponent.propTypes = {
  title: PropTypes.string,
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
