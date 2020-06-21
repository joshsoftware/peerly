import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Form } from "core-components/form/FormComponent";
import ImageComponent from "core-components/image/ImageComponent";

const ProfileImage = styled(ImageComponent)`
  height: ${({ size }) => `${size}vh`};
  width: ${({ size }) => `${size}vh`};
  box-shadow: ${({ shadow }) => (shadow ? "0px 3px 6px #00000029" : "")};
`;

const ProfileComponent = ({
  className,
  size,
  labelClass,
  src,
  name,
  id,
  setUserId,
  shadow,
}) => {
  const onClick = () => {
    setUserId(id);
  };
  return (
    <div /* eslint-disable-line  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
      className={className}
      onClick={onClick}
    >
      <ProfileImage
        size={size}
        src={src}
        roundedCircle={true}
        shadow={shadow}
        alt="Profile"
      />
      <Form.Label className={`font-weight-bold ${labelClass}`}>
        {name}
      </Form.Label>
    </div>
  );
};

ProfileComponent.defaultProps = {
  size: 10,
  id: 0,
  shadow: false,
};

ProfileComponent.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.number,
  labelClass: PropTypes.string,
  id: PropTypes.number,
  setUserId: PropTypes.func,
  shadow: PropTypes.bool,
};

export default React.memo(ProfileComponent);
