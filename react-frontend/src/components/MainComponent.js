import React from "react";
import Header from "core-components/Header";
import GivenByComponent from "core-components/GivenByComponent";
import GivenToComponent from "core-components/GivenToComponent";
import { Row, Col, Form } from "react-bootstrap";
import BadgeTypeComponent from "core-components/BadgeTypeComponent";
import SubmitComponent from "core-components/SubmitComponent";
const MainComponent = () => {
  return (
    <div>
      <Header />
      <br></br>
      <Form>
        <Row>
          <Col md={{ span: 3, offset: 1 }}>
            <GivenByComponent />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={{ span: 3, offset: 1 }}>
            <GivenToComponent />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={{ span: 3, offset: 1 }}>
            <BadgeTypeComponent />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <SubmitComponent />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default MainComponent;
