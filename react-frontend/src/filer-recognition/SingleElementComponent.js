import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Image from "core-components/image/ImageComponent";
import { Form } from "core-components/form/FormComponent";
import { Row } from "core-components/grid/GridComponent";

const ImageComponent = styled(Image)`
  height: inherit;
  width: auto;
}
`;

const SingleElementComponent = ({ className, text, imageSrc }) => (
  <div className={className}>
    <Row className="h-25 w-50">
      <ImageComponent
        src={imageSrc}
        className="hometown"
        alt="single element of filter"
        fluid={false}
        roundedCircle={true}
      />
    </Row>
    <Row className="h-50 d-flex justify-content-center align-items-center">
      <Form.Label>{text}</Form.Label>
    </Row>
  </div>
);

SingleElementComponent.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  text: PropTypes.string,
};

SingleElementComponent.defaultProps = {
  imageSrc: "submit",
  text: "element text",
};

export default SingleElementComponent;
