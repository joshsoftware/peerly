import React from "react";
import PropTypes from "prop-types";

import EmployeeNameAndImageComponent from "sharedComponent/EmployeeNameAndImageComponent";
const CreateRecognitionCardHeader = ({
  src,
  imgClassName,
  labelName,
  labelClassName,
  alt,
  height,
  width,
}) => {
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

CreateRecognitionCardHeader.propTypes = {
  labelName: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  imgClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default CreateRecognitionCardHeader;
