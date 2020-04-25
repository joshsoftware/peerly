import React from "react";
import { Navbar } from "react-bootstrap";
const Header = () => {
  return (
    //   <div>
    //     <Row>
    //       <Col xs="8">
    <div>
      <Navbar
        className="navbar-form navbar-fixed-top"
        position="fixed"
        bg="info"
        expand="lg"
      >
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Brand>
            <h1> WELCOME TO PEERLY</h1>
          </Navbar.Brand>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
    </div>
  );
};
export default Header;
