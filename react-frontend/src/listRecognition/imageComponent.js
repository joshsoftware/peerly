import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";
const ImageComponent = (props) => {
  const { src, shape } = props;
  return <Image src={require("./images/" + src)} className={shape} />;
};
ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
};
export default ImageComponent;
