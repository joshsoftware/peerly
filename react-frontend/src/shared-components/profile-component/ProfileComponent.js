import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Image from "core-components/image/ImageComponent";
import { Form } from "core-components/form/FormComponent";
import { Col, Row } from "core-components/grid/GridComponent";

const ImageComponent = styled(Image)`
  height: inherit;
  width: 100%;
}
`;

const ProfileComponent = ({ className, text, imageSrc, key, alt }) => (
  <Row className={className} key={key}>
    <Col className="h-100 w-50 d-flex justify-content-center align-items-center">
      <ImageComponent
        src={imageSrc}
        alt={alt}
        fluid={false}
        roundedCircle={true}
      />
    </Col>
    <Col className="w-50 text-center col">
      <Form.Label>{text}</Form.Label>
    </Col>
  </Row>
);

ProfileComponent.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  text: PropTypes.string,
  name: PropTypes.string,
  key: PropTypes.number,
  alt: PropTypes.string,
};

ProfileComponent.defaultProps = {
  imageSrc:
    "https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3A5bfa76ea-8d11-4647-9d07-06db873f7685&params=version%3A0&token=1591158470_da39a3ee_052fa588be615b623a6dc87ade964e437182cbae&api_key=CometServer1",
  text: "Employee Name",
  className: "d-flex justify-content-center align-items-center h-100",
};

export default ProfileComponent;
