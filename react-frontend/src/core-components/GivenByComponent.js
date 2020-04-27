import React from "react";
import { DropdownButton, Form, InputGroup, Dropdown } from "react-bootstrap";
const GivenByComponent = () => {
  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Given By </InputGroup.Text>
          <DropdownButton
            as={InputGroup.Append}
            variant="outline-secondary"
            title="Choose"
            id="input-group-dropdown-2"
          >
            <Dropdown.Item href="#">name1</Dropdown.Item>
            <Dropdown.Item href="#">name2</Dropdown.Item>
            <Dropdown.Item href="#">name3</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Separated link</Dropdown.Item>
          </DropdownButton>
        </InputGroup.Prepend>
      </InputGroup>
    </Form>
  );
};
export default GivenByComponent;
