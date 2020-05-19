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
  alt,
  ...props
}) => (
  <Image
    className={className}
    src={src}
    fluid={fluid}
    rounded={rounded}
    roundedCircle={roundedCircle}
    thumbnail={thumbnail}
    alt={alt}
    {...props}
  />
);

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  rounded: PropTypes.bool,
  roundedCircle: PropTypes.bool,
  thumbnail: PropTypes.bool,
  alt: PropTypes.string.isRequired,
  props: PropTypes.object,
};

ImageComponent.defaultProps = {
  fluid: true,
  rounded: false,
  roundedCircle: false,
  thumbnail: false,
};

export default React.memo(ImageComponent);
