import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";

const ImageComponent = ({
  src,
  fluid,
  rounded,
  roundedCircle,
  thumbnail,
  className,
}) => (
  <Image
    className={className}
    src={src}
    fluid={fluid}
    rounded={rounded}
    roundedCircle={roundedCircle}
    thumbnail={thumbnail}
  />
);

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  rounded: PropTypes.bool,
  roundedCircle: PropTypes.bool,
  thumbnail: PropTypes.bool,
};

ImageComponent.defaultProps = {
  fluid: true,
  rounded: false,
  roundedCircle: false,
  thumbnail: false,
};

export default React.memo(ImageComponent);
