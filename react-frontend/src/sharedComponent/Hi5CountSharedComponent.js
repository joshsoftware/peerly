import React from "react";
import PropTypes from "prop-types";

import LabelCoreComponent from "coreComponents/LabelCoreComponent";
import ImageCoreComponent from "coreComponents/ImageCoreComponent";
const Hi5CountSharedComponent = ({
  hi5Count,
  availabilityStatus,
  availabilityStatusClassName,
  hi5CountClassName,
  src,
  alt,
  height,
  width,
  imgClassName,
}) => (
  <>
    <ImageCoreComponent
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={imgClassName}
    />
    <LabelCoreComponent
      labelName={hi5Count}
      labelClassName={availabilityStatusClassName}
    />
    <LabelCoreComponent
      labelName={availabilityStatus}
      labelClassName={hi5CountClassName}
    />
  </>
);

Hi5CountSharedComponent.propTypes = {
  availabilityStatus: PropTypes.string.isRequired,
  availabilityStatusClassName: PropTypes.string,
  src: PropTypes.string.isRequired,
  imgClassName: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  hi5CountClassName: PropTypes.string,
  hi5Count: PropTypes.string.isRequired,
};

export default Hi5CountSharedComponent;
