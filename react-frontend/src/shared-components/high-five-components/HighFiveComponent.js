import React from "react";
import PropTypes from "prop-types";

import ImageComponent from "core-components/image/ImageComponent";
import { IMG_BASE_PATH } from "constants/appConstants";

const getImagePath = (size) =>
  size === "lg"
    ? `${IMG_BASE_PATH}/high-five@2x.png`
    : `${IMG_BASE_PATH}/high-five.png`;

const HighFiveComponent = ({
  fluid,
  rounded,
  roundedCircle,
  thumbnail,
  className,
  size,
}) => {
  const imagePath = React.useMemo(() => getImagePath(size), [size]);

  return (
    <ImageComponent
      src={imagePath}
      className={className}
      fluid={fluid}
      rounded={rounded}
      roundedCircle={roundedCircle}
      thumbnail={thumbnail}
      alt="High five recognition"
    />
  );
};

HighFiveComponent.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  rounded: PropTypes.bool,
  roundedCircle: PropTypes.bool,
  thumbnail: PropTypes.bool,
  size: PropTypes.oneOf(["md", "lg"]),
};

HighFiveComponent.defaultProps = {
  fluid: true,
  rounded: false,
  roundedCircle: false,
  thumbnail: false,
  size: "md",
};

export default React.memo(HighFiveComponent);
