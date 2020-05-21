import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import { IMG_BASE_PATH } from "constants/appConstants";

const getImagePath = (size) =>
  size === "lg"
    ? `${IMG_BASE_PATH}/cat-img@2x.png`
    : `${IMG_BASE_PATH}/cat-img.png`;

const PreLoginImageComponent = ({ className, hight, width, size }) => {
  const imagePath = React.useMemo(() => getImagePath(size), [size]);

  return (
    <Image
      src={imagePath}
      className={className}
      hight={hight}
      width={width}
      alt="pre login image"
    />
  );
};

PreLoginImageComponent.propTypes = {
  className: PropTypes.string,
  hight: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.oneOf(["md", "lg"]),
};

PreLoginImageComponent.defaultProps = {
  size: "md",
};

export default PreLoginImageComponent;
