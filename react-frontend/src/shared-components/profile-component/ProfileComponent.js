import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Image from "core-components/image/ImageComponent";
import { Form } from "core-components/form/FormComponent";
import { Col, Row } from "core-components/grid/GridComponent";

const ImageComponent = styled(Image)`
  height: inherit;
  width: inherit;
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
    <Col className="w-50 text-center">
      <Form.Label>{text}</Form.Label>
    </Col>
  </Row>
);

ProfileComponent.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  text: PropTypes.string,
  name: PropTypes.string,
  key: PropTypes.number,
  alt: PropTypes.string,
};

ProfileComponent.defaultProps = {
  imageSrc: require("./profile.png"),
  text: "Employee Name",
  className: "d-flex justify-content-center align-items-center h-100",
};

export default ProfileComponent;
