import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyDisplayImage = (props) => {
  const { src } = props;
  return <Image src={src} roundedCircle />;
};

PeerlyDisplayImage.propTypes = {
  src: PropTypes.string,
};
export default PeerlyDisplayImage;
