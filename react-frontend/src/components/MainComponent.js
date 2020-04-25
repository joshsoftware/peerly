import React from "react";
//import SignInComponent from "components/SignInComponent";
import { Row, Col } from "react-bootstrap";
import HomeComponent from "components/HomeComponent";
import Header from "components/Header";
import SignInComponent from "components/SignInComponent";
const MainComponent = () => {
  return (
    <div>
      <Row>
        <Col xs="8">
          <Header />
          <HomeComponent />
        </Col>
        <Col>
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
          <SignInComponent />
        </Col>
      </Row>
    </div>
  );
};
export default MainComponent;
