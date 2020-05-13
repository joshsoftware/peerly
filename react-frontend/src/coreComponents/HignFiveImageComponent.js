import React from "react";
import PropTypes from "prop-types";

import ImageComponent from "./ImageComponent";
import highFiveImage from "assets/images/high-five.png";
import largeHighFiveImage from "assets/images/high-five@2x.png";

const HighFiveImageComponent = ({
  fluid,
  rounded,
  roundedCircle,
  thumbnail,
  className,
  size,
}) => (
  <ImageComponent
    src={size === "lg" ? largeHighFiveImage : highFiveImage}
    className={className}
    fluid={fluid}
    rounded={rounded}
    roundedCircle={roundedCircle}
    thumbnail={thumbnail}
  />
);

HighFiveImageComponent.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  rounded: PropTypes.bool,
  roundedCircle: PropTypes.bool,
  thumbnail: PropTypes.bool,
  size: PropTypes.oneOf(["md", "lg"]),
};

HighFiveImageComponent.defaultProps = {
  className: "",
  fluid: false,
  rounded: false,
  roundedCircle: false,
  thumbnail: false,
  size: "md",
};

export default HighFiveImageComponent;
