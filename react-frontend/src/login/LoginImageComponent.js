import React from "react";
import PropTypes from "prop-types";
import { IMG_BASE_PATH } from "constants/appConstants";
import ImageComponent from "core-components/image/ImageComponent";

const getImagePath = (size) =>
  size === "lg"
    ? `${IMG_BASE_PATH}/cat-img.png`
    : `${IMG_BASE_PATH}/cat-mobile-img.png`;

const LoginImageComponent = ({ className, size }) => {
  const imagePath = React.useMemo(() => getImagePath(size), [size]);

  return (
    <ImageComponent src={imagePath} className={className} alt="login image" />
  );
};

LoginImageComponent.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["md", "lg"]),
};

LoginImageComponent.defaultProps = {
  size: "md",
};

export default React.memo(LoginImageComponent);
