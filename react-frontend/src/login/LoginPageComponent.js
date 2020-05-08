import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";

import LoginLabelComponent from "login/LoginLabelComponent";
import LogoComponent from "login/LogoComponent";
import ImageComponent from "core-components/ImageComponent";
import ButtonComponent from "core-components/ButtonComponent";
import WorkingSlideComponent from "login/WorkingInfoComponent";

const LoginPageComponent = ({
  orgPrimaryCoreValue,
  encouragementThought,
  mobileVersionImage,
  webVersionImage,
  sliderList,
  buttonText,
}) => (
  <>
    <Container fluid={true}>
      <div className="p-0 m-0 h-100 w-100 container-fluid">
        <div className="bg-dark text-white d-none d-md-block">
          <Row>
            <Col className="col-4" style={{ background: "#87BCBF" }}>
              <div style={{ height: 100 }}></div>
              <div className="">
                <WorkingSlideComponent
                  sliderList={sliderList}
                  titleClassName="justify-content-center text-center"
                  imageClassName="w-100"
                  videoClassName="w-100"
                />
              </div>
            </Col>
            <Col className="col-4 p-0">
              <ImageComponent
                className="w-100"
                height="669"
                src={webVersionImage}
              />
            </Col>
            <Col className="col-4 pt-2" style={{ background: "#334856" }}>
              <Row style={{ height: 220 }}>
                <LogoComponent
                  className="text-white h1 text-center w-100 font-weight-bold justify-content-center"
                  text="Peerly"
                />
              </Row>
              <Row className="text-center" style={{ height: 220 }}>
                <Col className="justify-content-center w-100 pt-5">
                  <ButtonComponent
                    type="button"
                    className="btn btn-light text-sm"
                    style={{ borderRadius: 25 }}
                    icon={<AiOutlineMail height={15} width={2} />}
                    text={buttonText}
                  />
                </Col>
              </Row>
              <Row style={{ height: 220 }}>
                <Col className="col-3 p-0"></Col>
                <Col className="col-6 p-0">
                  <LoginLabelComponent
                    className="text-center text-white h3 font-weight-bold"
                    orgPrimaryCoreValue={orgPrimaryCoreValue}
                    encoragementThought={encouragementThought}
                  />
                </Col>
                <Col className="col-3 p-0"></Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="bg-dark d-sm-block d-md-none h-100 w-100 p-0">
          <Row className="h-25">
            <LogoComponent
              className="text-white h1 text-center w-100 font-weight-bold justify-content-center"
              text="Peerly"
            />
          </Row>
          <Row className="h-50">
            <Col className="col-12">
              <ImageComponent className="w-100" src={mobileVersionImage} />
            </Col>
          </Row>
          <Row className="h-25">
            <Col className="col-3 p-0"></Col>
            <Col className="col-6 p-0">
              <LoginLabelComponent
                className="text-center text-white h3 font-weight-bold"
                orgPrimaryCoreValue={orgPrimaryCoreValue}
                encoragementThought={encouragementThought}
              />
            </Col>
            <Col className="col-3 p-0"></Col>
          </Row>
        </div>
      </div>
    </Container>
  </>
);

LoginPageComponent.propTypes = {
  orgPrimaryCoreValue: PropTypes.string,
  encouragementThought: PropTypes.string,
  mobileVersionImage: PropTypes.string.isRequired,
  webVersionImage: PropTypes.string.isRequired,
  sliderList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.shape({
        image: PropTypes.string,
        video: PropTypes.any,
      }).isRequired,
    })
  ),
  buttonText: PropTypes.string.isRequired,
};

export default LoginPageComponent;
