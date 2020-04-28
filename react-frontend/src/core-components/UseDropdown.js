import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
const UseDropdown = (props) => {
  const { list } = props.list;
  return (
    <div>
      {list.map((object) => (
        <Dropdown.Item key={object} href="#">
          {object}
        </Dropdown.Item>
      ))}
    </div>
  );
};
UseDropdown.propTypes = {
  list: PropTypes.array,
};
export default UseDropdown;
