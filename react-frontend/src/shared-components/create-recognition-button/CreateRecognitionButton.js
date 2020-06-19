import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PlusSign from "shared-components/plus-sign/PlusSign"; //todo depend upon peerly logo

const ButtonComponent = styled.div`
  background: transparent url(${(props) => props.imageUrl}) 90% 60% no-repeat
    padding-box;
  opacity: 1;
  box-shadow: 0px 3px 6px #0000004e;
  width: 45px;
  height: 45px;
  background-color: var(--rust);
  border: none;
  border-radius: 50%;
  margin-top: 7.5px;
  margin-left: 7.5px;
`;

const PlusSignWrapper = styled.div`
  position: absolute;
  margin-left: 10px;
  font-size: 23px;
  color: var(--white);
`;

const RoundCircle = styled.div`
  position: absolute;
  background: var(--white) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000004e;
  opacity: 1;
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;

const CreateRecognitionButton = ({ onClick, imageUrl }) => {
  return (
    <RoundCircle>
      <ButtonComponent onClick={onClick} imageUrl={imageUrl}>
        <PlusSignWrapper>
          <PlusSign />
        </PlusSignWrapper>
      </ButtonComponent>
    </RoundCircle>
  );
};

CreateRecognitionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default React.memo(CreateRecognitionButton);
