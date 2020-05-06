import React from "react";
import PropTypes from "prop-types";

import LabelCoreComponent from "../coreComponents/LabelCoreComponent";
import ImageCoreComponent from "../coreComponents/ImageCoreComponent";
const CreateRecognitionListOfEmployee = ({ employeeList }) => (
  <>
    {employeeList.map((object) => (
      <>
        <ImageCoreComponent
          key={object.index}
          src={object.src}
          alt={object.alt}
          height={object.heightOfImage}
          width={object.widthOfImage}
          className={object.imgClassName}
        />
        <LabelCoreComponent
          key={object.index}
          labelName={object.name}
          className={object.labelClassName}
        />
      </>
    ))}
  </>
);

CreateRecognitionListOfEmployee.propTypes = {
  employeeList: PropTypes.arrayOf(PropTypes.object),
};

export default CreateRecognitionListOfEmployee;
