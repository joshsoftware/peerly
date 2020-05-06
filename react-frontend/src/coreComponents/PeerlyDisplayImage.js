import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyDisplayImage = ({ src, className }) => (
  <Image src={src} className={className} />
);

PeerlyDisplayImage.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default PeerlyDisplayImage;
