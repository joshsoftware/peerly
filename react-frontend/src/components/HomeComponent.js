import React from "react";
import { Navbar, Alert } from "react-bootstrap";

const HomeComponent = () => {
  return (
    <div>
      <Navbar
        className="navbar-form navbar-fixed-top"
        position="fixed"
        bg="primary"
        expand="xl"
      >
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Brand>
            <centre>
              <h1> WELCOME TO PEERLY</h1>
            </centre>
          </Navbar.Brand>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <div className="h-50 d-inline-block">
        <Alert variant="success">
          <Alert.Heading>
            <h2>
              <b>Hey, nice to see you</b>
            </h2>
          </Alert.Heading>
          <hr />
          <Alert.Heading>
            <h3>
              <u>The Peer Rewards and Recognition System</u>
            </h3>
          </Alert.Heading>
          <br></br>
          <p className="text-left">
            Peerly is peer-recognision and rewarding system! Every employee gets
            and gives high-5 (henceforth called hi5) Give a hi5 to someone who
            you want to appreciate for something they did. Every week you get 2
            hi5 that you can give to others - use it or lose it.
          </p>
          <br></br>
          <br></br>
          <br></br>
          <hr />
        </Alert>
      </div>
    </div>
  );
};
export default HomeComponent;
