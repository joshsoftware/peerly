import React from "react";
import PropTypes from "prop-types";

import ImageCoreComponent from "../coreComponents/ImageCoreComponent";
import LabelCoreComponent from "../coreComponents/LabelCoreComponent";
const CreateRecognitionCardHeader = ({
  labelName,
  src,
  imgClassName,
  labelClassName,
}) => {
  return (
    <>
      <ImageCoreComponent src={src} className={imgClassName} />
      <LabelCoreComponent labelName={labelName} className={labelClassName} />
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
