import React from "react";
import PropTypes from "prop-types";
import { AiOutlineMail } from "react-icons/ai";

import LogoComponent from "./LogoComponent";
import { Row, Col } from "react-bootstrap";
import ButtonComponent from "core-components/ButtonComponent";

const SecondLoginPageMobileComponent = ({ buttonText }) => (
  <div className="justify-content-center d-sm-block d-md-none bg-dark w-100">
    <Row className="justify-content-center" style={{ height: 300 }}>
      <Col className="col-4"></Col>
      <Col className="col-4">
        <LogoComponent
          className="text-white h1 mt-2 text-center w-100 font-weight-bold justify-content-center"
          text="Peerly"
          firstLabelClassName="text-danger"
        />
      </Col>
      <Col className="col-4"></Col>
    </Row>
    <Row
      style={{ height: 300 }}
      className="justify-align-center justify-content-center w-100 pt-5"
    >
      <Col className="col-4"></Col>
      <Col className="col-4 justify-align-center ">
        <ButtonComponent
          type="button"
          className="btn btn-light mr-2"
          style={{ borderRadius: 25, width: 180 }}
          icon={<AiOutlineMail height={15} width={2} className="m-2" />}
          text={buttonText}
          size="sm"
        />
      </Col>
      <Col className="col-4"></Col>
    </Row>
    <Row style={{ height: 200 }}></Row>
  </div>
);

SecondLoginPageMobileComponent.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default SecondLoginPageMobileComponent;
