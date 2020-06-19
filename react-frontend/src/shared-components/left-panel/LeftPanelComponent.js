import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Card } from "core-components/card/CardComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";
import CreateRecognitionButton from "shared-components/create-recognition-button/CreateRecognitionButton";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";

const Wrapper = styled(Card)`
  border-radius: 36px;
  height: 100vh;
  background: linear-gradient(var(--sage) 25%, var(--white) 0%);
`;

const LeftPanelComponent = ({
  hi5ImageForButton,
  profileImage,
  profileName,
  collectedHi5,
}) => {
  const onClick = () => {
    //todo;
  };
  return (
    <Wrapper className="justify-content-around align-items-center d-flex flex-column">
      <ProfileComponent
        name={profileName}
        src={profileImage}
        size={12}
        className="d-flex flex-column"
      />
      <div className="d-flex flex-column">
        <div className="m-auto">
          <HighFiveComponent />
        </div>
        <span>{collectedHi5}collected</span>
      </div>
      <CreateRecognitionButton imageUrl={hi5ImageForButton} onClick={onClick} />
    </Wrapper>
  );
};

LeftPanelComponent.propTypes = {
  hi5ImageForButton: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  collectedHi5: PropTypes.string.isRequired,
};

export default React.memo(LeftPanelComponent);
