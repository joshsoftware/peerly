import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyDisplayImage = ({ src, imgClassName }) => (
  <Image src={src} className={imgClassName} />
);

PeerlyDisplayImage.propTypes = {
  src: PropTypes.string.isRequired,
  imgClassName: PropTypes.string,
};
export default PeerlyDisplayImage;
