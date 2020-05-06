import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";
const ImageComponent = (props) => {
  const { img, shape } = props;
  return <Image src={require("./" + img)} className={shape} />;
};
ImageComponent.propTypes = {
  img: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
};
export default ImageComponent;
