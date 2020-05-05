import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";
const ImageComponent = (props) => {
  const { path } = props;
  return <Image src={require(path)} roundedCircle />;
};
ImageComponent.propTypes = {
  path: PropTypes.string,
  structure: PropTypes.string,
};
export default ImageComponent;
