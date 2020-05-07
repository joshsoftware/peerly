import React from "react";
import PropTypes from "prop-types";

import ImageCoreComponent from "../coreComponents/ImageCoreComponent";
import LabelCoreComponent from "../coreComponents/LabelCoreComponent";
const CreateRecognitionSharedCardHeader = (props) => {
  const { src, imgClassName, labelName, labelClassName } = props;

  return (
    <>
      <ImageCoreComponent src={src} className={imgClassName} />
      <LabelCoreComponent labelName={labelName} className={labelClassName} />
    </>
  );
};

CreateRecognitionSharedCardHeader.propTypes = {
  src: PropTypes.string.isRequired,
  imgClassName: PropTypes.string,
  labelName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
};

export default CreateRecognitionSharedCardHeader;
