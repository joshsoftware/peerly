import React from "react";
import PropTypes from "prop-types";

import ImageCoreComponent from "../coreComponents/ImageCoreComponent";
import LabelCoreComponent from "../coreComponents/LabelCoreComponent";
const EmployeeNameAndImageComponent = ({
  src,
  imgClassName,
  labelName,
  labelClassName,
  alt,
  height,
  width,
}) => (
  <>
    <ImageCoreComponent
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={imgClassName}
    />
    <LabelCoreComponent labelName={labelName} className={labelClassName} />
  </>
);

EmployeeNameAndImageComponent.propTypes = {
  labelName: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  imgClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default EmployeeNameAndImageComponent;
