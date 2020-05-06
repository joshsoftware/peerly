import React from "react";
import { Row, Col } from "react-bootstrap";

import PeerlyLabelComponent from "../core-components/PeerlyLabelComponent";

const PeerlyLogoComponent = (props /*eslint-disable-line no-unused-vars*/) => {
  return (
    <Row>
      <Col md="12">
        <h1>
          <center>
            <PeerlyLabelComponent
              className="text-info font-weight-bold text-center"
              text="Peerly"
            />
          </center>
        </h1>
      </Col>
    </Row>
  );
};

export default PeerlyLogoComponent;
