import React from "react";
import PropTypes from "prop-types";

import ImageComponent from "./ImageComponent";
import { IMAGE_ASSET_PATH } from "constants/appConstants";

const HighFiveImageComponent = ({
  fluid,
  rounded,
  roundedCircle,
  thumbnail,
  className,
  size,
}) => (
  <ImageComponent
    src={
      size === "lg"
        ? `${IMAGE_ASSET_PATH}/high-five@2x.png`
        : `${IMAGE_ASSET_PATH}/high-five.png`
    }
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
