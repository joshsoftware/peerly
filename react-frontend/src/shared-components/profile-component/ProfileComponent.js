import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Form } from "core-components/form/FormComponent";
import ImageComponent from "core-components/image/ImageComponent";

const ProfileImage = styled(ImageComponent)`
  height: ${({ size }) => `${size}vh`};
  width: ${({ size }) => `${size}vh`};
`;

const ProfileComponent = ({ className, size, labelClass, src, name }) => (
  <div className={className}>
    <ProfileImage size={size} src={src} roundedCircle={true} alt="Profile" />
    <Form.Label className={`font-weight-bold ${labelClass}`}>{name}</Form.Label>
  </div>
);

ProfileComponent.defaultProps = {
  size: 10,
};

ProfileComponent.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.number,
  labelClass: PropTypes.string,
};

export default React.memo(ProfileComponent);
