import React from "react";
import PropTypes from "prop-types";

import PeerlyDisplayImage from "../coreComponents/ImageCoreComponent";
import PeerlyLabelComponent from "../coreComponents/LabelCoreComponent";
const CreateRecognitionCardHeader = ({
  labelName,
  src,
  imgClassName,
  labelClassName,
}) => {
  return (
    <>
      <PeerlyDisplayImage src={src} className={imgClassName} />
      <PeerlyLabelComponent labelName={labelName} className={labelClassName} />
    </>
  );
};

CreateRecognitionCardHeader.propTypes = {
  labelName: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  imgClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default CreateRecognitionCardHeader;
