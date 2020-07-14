import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PlusSign from "shared-components/plus-sign/PlusSign"; //todo depend upon peerly logo

const WrapperCircle = styled.div`
  background: var(--white) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px var(--box-shadow-color);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  position: relative;
`;

const ButtonComponent = styled.div`
  background: transparent url(${(props) => props.imageUrl})
  97% 50% no-repeat
  padding-box;
  box-shadow: 0px 3px 6px #0000004e;
  width: 45px;
  height: 45px;
  background-color: var(--rust);
  border: none;
  border-radius: 50%;
  ”
`;

const CreateRecognitionButton = ({ onClick, imageUrl, theme, fontSize }) => {
  return (
    <WrapperCircle className="m-auto justify-content-center">
      <ButtonComponent
        id="create-recognition-button"
        imageUrl={imageUrl}
        className="m-auto text-center"
        onClick={onClick}
      >
        <PlusSign fontSize={fontSize} theme={theme} />
      </ButtonComponent>
    </WrapperCircle>
  );
};

CreateRecognitionButton.defaultProps = {
  theme: "light",
  fontSize: "27px",
};

CreateRecognitionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(["dark", "light"]),
  fontSize: PropTypes.string,
};

export default React.memo(CreateRecognitionButton);
