import React from "react";
import { Navbar, Alert, Col, Row, Container } from "react-bootstrap";
import SignInComponent from "./SignInComponent";

const HomeComponent = () => {
  return (
    <div>
      <Row>
        <Col xs="8">
          <div className="h-100 d-inline-block">
            <Navbar
              className="navbar-form navbar-fixed-top"
              position="fixed"
              bg="info"
              expand="lg"
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
              <Alert variant="secondary">
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
                <hr />
                <br></br>
                <p className="text-left">
                  Peerly is peer-recognition and rewarding system! Every
                  employee gets and gives high-5 (henceforth called hi5) Give a
                  hi5 to someone who you want to appreciate for something they
                  did. Every week you get 2 hi5 that you can give to others use
                  it or lose it.
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </p>
                <br></br>
                <br></br>
              </Alert>
            </div>
          </div>
        </Col>
        <Col>
          <Container>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Row>
              <Col xs="3"></Col>
              <SignInComponent />
              <Col xs="3"></Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
export default HomeComponent;
