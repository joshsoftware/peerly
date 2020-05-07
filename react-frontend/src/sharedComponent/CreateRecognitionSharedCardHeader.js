import React from "react";
import PropTypes from "prop-types";

import EmployeeNameAndImageComponent from "sharedComponent/EmployeeNameAndImageComponent";
const CreateRecognitionSharedCardHeader = (props) => {
  const {
    src,
    imgClassName,
    labelName,
    labelClassName,
    alt,
    height,
    width,
  } = props;

  return (
    <EmployeeNameAndImageComponent
      src={src}
      imgClassName={imgClassName}
      labelName={labelName}
      labelClassName={labelClassName}
      alt={alt}
      height={height}
      width={width}
    />
  );
};

CreateRecognitionSharedCardHeader.propTypes = {
  labelName: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  imgClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default CreateRecognitionSharedCardHeader;
