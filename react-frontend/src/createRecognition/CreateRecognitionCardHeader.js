import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import PeerlyDisplayImage from "../coreComponents/PeerlyDisplayImage";
import PeerlyLabelComponent from "../coreComponents/PeerlyLabelComponent";
const CreateRecognitionCardHeader = ({ labelName, src, className }) => {
  return (
    <>
      <Row>
        <Col xs={2}></Col>
        <Col>
          <PeerlyDisplayImage src={src} className={className} />
        </Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col>
          <PeerlyLabelComponent labelName={labelName} />
        </Col>
      </Row>
    </>
  );
};

CreateRecognitionCardHeader.propTypes = {
  labelName: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default CreateRecognitionCardHeader;
