import React from "react";
import { Row, Col } from "react-bootstrap";

//import PeerlyLabelComponent from "../core-components/PeerlyLabelComponent";

const PeerlyLoginLabelComponent = (
  props /*eslint-disable-line no-unused-vars*/
) => {
  return (
    <Row className="text-dark font-weight-bold ">
      <Col md="3"></Col>
      <Col md="6">
        <h3>
          <Row className="font-weight-bold ">
            <Col md="12">
              <center>Lets Create the</center>
            </Col>
          </Row>
          <Row className="font-weight-bold ">
            <Col md="12">
              <center>Office Positive</center>
            </Col>
          </Row>
          <Row className="font-weight-bold ">
            <Col md="12">
              <center> ___ </center>
            </Col>
          </Row>
        </h3>
        <Row className="font-weight-bold ">
          <Col md="12">
            <center>Encouragement Driven</center>
          </Col>
        </Row>
      </Col>
      <Col md="3"></Col>
    </Row>
  );
};

export default PeerlyLoginLabelComponent;
