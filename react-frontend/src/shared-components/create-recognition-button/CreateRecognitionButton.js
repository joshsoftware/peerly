import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PlusSign from "shared-components/plus-sign/PlusSign"; //todo depend upon peerly logo

const ButtonComponent = styled.div`
  background: transparent url(${(props) => props.imageUrl}) 90% 60% no-repeat
  opacity: 1;
  box-shadow: 0px 3px 6px #0000004e;
  width: 45px;
  height: 45px;
  background-color: var(--rust);
  border: none;
  border-radius: 50%;
  margin-right:6px;
`;

const PlusSignWrapper = styled(PlusSign)`
  margin-left: 10px;
  margin-top: 8px;
`;

const WrapperCircle = styled.div`
  background: var(--white) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px var(--box-shadow-color);
  opacity: 1;
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;

const CreateRecognitionButton = ({ onClick, imageUrl, theme }) => {
  return (
    <WrapperCircle className="m-auto d-flex justify-content-center align-content-center">
      <ButtonComponent className="m-auto" onClick={onClick} imageUrl={imageUrl}>
        <PlusSignWrapper fontSize="23px" theme={theme} />
      </ButtonComponent>
    </WrapperCircle>
  );
};

CreateRecognitionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  theme: PropTypes.oneOfoneOf(["dark", "light"]),
};

export default React.memo(CreateRecognitionButton);
