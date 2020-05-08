import React from "react";
import PropTypes from "prop-types";

import EmployeeNameAndImageComponent from "sharedComponent/EmployeeNameAndImageComponent";
const CreateRecognitionListOfEmployee = ({ employeeList }) =>
  employeeList.map((employee, index) => (
    <EmployeeNameAndImageComponent
      key={index}
      src={employee.src}
      alt={employee.alt}
      height={employee.height}
      width={employee.width}
      imgClassName={employee.imgClassName}
      labelName={employee.labelName}
      labelClassName={employee.labelClassName}
    />
  ));

CreateRecognitionListOfEmployee.propTypes = {
  employeeList: PropTypes.arrayOf(
    PropTypes.shape({
      labelName: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      imgClassName: PropTypes.string,
      labelClassName: PropTypes.string,
      alt: PropTypes.string,
      height: PropTypes.string,
      width: PropTypes.string,
    })
  ),
};

export default CreateRecognitionListOfEmployee;
