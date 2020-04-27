import React from "react";
import { DropdownButton, Form, InputGroup, Dropdown } from "react-bootstrap";
const BadgeTypeComponent = () => {
  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Badge Type</InputGroup.Text>
          <DropdownButton
            as={InputGroup.Append}
            variant="outline-secondary"
            title="Choose"
            id="input-group-dropdown-2"
          >
            <Dropdown.Item href="#">name1</Dropdown.Item>
            <Dropdown.Item href="#">name2</Dropdown.Item>
            <Dropdown.Item href="#">name3</Dropdown.Item>
          </DropdownButton>
        </InputGroup.Prepend>
      </InputGroup>
    </Form>
  );
};
export default BadgeTypeComponent;
