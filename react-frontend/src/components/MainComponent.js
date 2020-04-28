import React from "react";
import Header from "core-components/Header";
import { Row, Col, Form } from "react-bootstrap";
import ListContainer from "Container/ListContainer";
import SubmitComponent from "core-components/SubmitComponent";
const MainComponent = () => {
  const text = "Filter";
  return (
    <div>
      <Header text={text} />
      <br></br>
      <Form>
        <Row>
          <Col md={{ span: 3, offset: 1 }}>
            <ListContainer />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={{ span: 3, offset: 1 }}></Col>
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
