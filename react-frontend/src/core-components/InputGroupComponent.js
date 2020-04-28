import React from "react";
import { InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
const InputGroupComponent = (props) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>{props.title}</InputGroup.Text>
      </InputGroup.Prepend>
    </InputGroup>
  );
};
InputGroupComponent.propTypes = {
  title: PropTypes.string,
};
export default InputGroupComponent;
