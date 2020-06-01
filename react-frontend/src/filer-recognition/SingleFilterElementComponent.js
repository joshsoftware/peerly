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

const SingleFilterElementComponent = ({ className, text, imageSrc, key }) => (
  <Row className={className} key={key}>
    <div className="h-100 w-25">
      <Col>
        <ImageComponent
          src={imageSrc}
          alt="single element of filter"
          fluid={false}
          roundedCircle={true}
        />
      </Col>
    </div>
    <Col className="w-75 d-flex justify-content-start align-items-center col">
      <Form.Label>{text}</Form.Label>
    </Col>
  </Row>
);

SingleFilterElementComponent.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  text: PropTypes.string,
  name: PropTypes.string,
  key: PropTypes.number,
};

SingleFilterElementComponent.defaultProps = {
  imageSrc:
    "https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3A56bbf9a8-ca91-4410-841a-be1437b42aad&params=version%3A0&token=1591068805_da39a3ee_513e69c3baa158ce3deacf8433e36b59bfbfaaf6&api_key=CometServer1",
  text: "Employee Name",
};

export default SingleFilterElementComponent;
