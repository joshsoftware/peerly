import React from "react";
import UseDropdownButton from "core-components/UseDropdownButton";
import UseDropdown from "core-components/UseDropdown";
import InputGroupComponent from "core-components/InputGroupComponent";
import FormComponent from "core-components/FormComponent";
import PropTypes from "prop-types";
const GivenComponent = (props) => {
  //console.log("Inside GivenComponent " + props);
  const title = "Given By";

  return (
    <FormComponent>
      <InputGroupComponent title={title}>
        <UseDropdownButton>
          <UseDropdown list={props} />
        </UseDropdownButton>
      </InputGroupComponent>
    </FormComponent>
  );
};
GivenComponent.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
};
export default GivenComponent;
