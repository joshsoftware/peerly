import React from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import PeerlyLabelComponent from "../coreComponents/PeerlyLabelComponent";
import PeerlyButtonComponent from "../coreComponents/PeerlyButtonComponent";
const CreateRecognitionCardBody = (props) => {
  const {
    buttonText,
    labelName,
    className,
    type,
    value,
    variant,
    size,
  } = props;

  return (
    <>
      <Row>
        <Col xs={2}></Col>
        <Col>
          <PeerlyLabelComponent labelName={labelName} />
        </Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={2}>
          <PeerlyButtonComponent
            variant={variant}
            size={size}
            type={type}
            className={className}
            buttonText={buttonText}
            value={value}
          />
        </Col>
        <Col xs={2}>
          <PeerlyButtonComponent
            variant={variant}
            size={size}
            type={type}
            className={className}
            buttonText={buttonText}
            value={value}
          />
        </Col>
        <Col xs={2}>
          <PeerlyButtonComponent
            variant={variant}
            size={size}
            type={type}
            className={className}
            buttonText={buttonText}
            value={value}
          />
        </Col>
        <Col xs={2}>
          <PeerlyButtonComponent
            variant={variant}
            size={size}
            type={type}
            className={className}
            buttonText={buttonText}
            value={value}
          />
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col>
          <PeerlyButtonComponent variant={variant} buttonText={buttonText} />
        </Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col>
          <PeerlyButtonComponent variant="outline-info" buttonName="Done" />
        </Col>
      </Row>
    </>
  );
};

CreateRecognitionCardBody.propTypes = {
  type: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  labelName: PropTypes.string.isRequired,
};

export default CreateRecognitionCardBody;
