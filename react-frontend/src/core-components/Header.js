import React from "react";
import { Navbar } from "react-bootstrap";
const Header = () => {
  return (
    <div>
      <Navbar bg="success" expand="lg">
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Brand>
            <h2>Filters</h2>
          </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
