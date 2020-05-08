import React from "react";
import PropTypes from "prop-types";

import EmployeeNameAndImageComponent from "sharedComponent/EmployeeNameAndImageComponent";
const CreateRecognitionCardHeader = ({ cardHeader }) => (
  <EmployeeNameAndImageComponent
    src={cardHeader.src}
    imgClassName={cardHeader.imgClassName}
    labelName={cardHeader.labelName}
    labelClassName={cardHeader.labelClassName}
    alt={cardHeader.alt}
    height={cardHeader.height}
    width={cardHeader.width}
  />
);

CreateRecognitionCardHeader.propTypes = {
  cardHeader: PropTypes.shape({
    labelName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    imgClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    alt: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
  }),
};

export default CreateRecognitionCardHeader;
