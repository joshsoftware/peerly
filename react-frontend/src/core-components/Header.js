import React from "react";
import { Navbar } from "react-bootstrap";
import PropTypes from "prop-types";
const Header = (props) => {
  return (
    <div>
      <Navbar bg="success" expand="lg">
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Brand>
            <h1>{props.text} </h1>
          </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
Header.propTypes = {
  text: PropTypes.string,
};
export default Header;
