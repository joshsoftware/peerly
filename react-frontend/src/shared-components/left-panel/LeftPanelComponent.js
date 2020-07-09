import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Card } from "core-components/card/CardComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";
import CreateRecognitionContainer from "shared-components/create-recognition-button/CreateRecognitionContainer";

const Wrapper = styled(Card)`
  border-radius: 36px 36px 0px 0px;
  height: 100%;
  width: 15%;
  background: linear-gradient(var(--sage) 15%, var(--white) 0%);
`;

const LeftPanelComponent = ({
  profileImage,
  profileName,
  collectedHi5,
  setUserId,
  id,
}) => {
  return (
    <div className="d-none d-md-block">
      <Wrapper className="justify-content-around align-items-center d-flex flex-column  position-fixed">
        <ProfileComponent
          name={profileName}
          src={profileImage}
          setUserId={setUserId}
          id={id}
          size={12}
          shadow
          className="d-flex flex-column text-center mt-5"
        />
        <div className="m-auto">
          <div className="text-center">
            <HighFiveComponent />
          </div>
          <div>
            <span>{collectedHi5}collected</span>
          </div>
        </div>
        <CreateRecognitionContainer />
      </Wrapper>
    </div>
  );
};

LeftPanelComponent.propTypes = {
  listOfEmployee: PropTypes.array,
  profileImage: PropTypes.string,
  profileName: PropTypes.string,
  collectedHi5: PropTypes.number,
  errorMessage: PropTypes.string,
  showError: PropTypes.string,
  handleCloseError: PropTypes.func,
  handleShowError: PropTypes.func,
  showPopup: PropTypes.func,
  hi5_quota_balance: PropTypes.number,
  setUserId: PropTypes.func,
  id: PropTypes.number,
};

export default React.memo(LeftPanelComponent);
