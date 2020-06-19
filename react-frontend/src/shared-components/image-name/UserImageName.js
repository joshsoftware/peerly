import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Image from "core-components/image/ImageComponent";
import { Form } from "core-components/form/FormComponent";
import { Row } from "core-components/grid/GridComponent";

const ImageComponent = styled(Image)`
  height: inherit;
  width: inherit;
}
`;

const UserImageName = ({ className, text, imageSrc, key }) => (
  <div className={className} key={key}>
    <Row className="justify-content-center">
      <ImageComponent
        src={imageSrc}
        alt="single element of filter"
        fluid={false}
        roundedCircle={true}
      />
    </Row>
    <Row className="justify-content-center">
      <Form.Label>{text}</Form.Label>
    </Row>
  </div>
);

UserImageName.propTypes = {
  key: PropTypes.number,
  className: PropTypes.string,
  // onClick: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  text: PropTypes.string,
  name: PropTypes.string,
};

UserImageName.defaultProps = {
  imageSrc:
    "https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3Ae4e32c39-1480-4122-aed7-6e9cf0871677&params=version%3A0&token=1591073643_da39a3ee_3cbad380723b213550e5fc5179e925e038cf581d&api_key=CometServer1",
  text: "Employee Name",
};

export default UserImageName;
