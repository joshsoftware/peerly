import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Card } from "core-components/card/CardComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";
import CreateRecognitionButton from "shared-components/create-recognition-button/CreateRecognitionButton";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";
import PopupWindow from "shared-components/user-list/PopupUserList";

const Wrapper = styled(Card)`
  position: absolute;
  margin-top: -600px;
  margin-left: 80px;
  width: 150px;
  border-radius: 36px;
  height: 80vh;
  background: linear-gradient(var(--sage) 25%, var(--white) 0%);
`;

const LeftPanelComponent = ({
  hi5ImageForButton,
  profileImage,
  profileName,
  collectedHi5,
  listOfEmployee,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const sendData = () => {
    //TODO
  };
  return (
    <Wrapper className="justify-content-around align-items-center d-flex flex-column">
      <ProfileComponent
        name={profileName}
        src={profileImage}
        size={12}
        className="d-flex flex-column"
      />
      <div className="m-auto">
        <div className="text-center">
          <HighFiveComponent />
        </div>
        <div>
          <span>{collectedHi5}collected</span>
        </div>
      </div>
      <CreateRecognitionButton
        imageUrl={hi5ImageForButton}
        onClick={handleShow}
      />
      <PopupWindow
        show={show}
        handleClose={handleClose}
        recognitionToImage={profileImage}
        recognitionToName={profileName}
        sendData={sendData}
        listOfEmployee={listOfEmployee}
      ></PopupWindow>
    </Wrapper>
  );
};

LeftPanelComponent.propTypes = {
  listOfEmployee: PropTypes.array,
  hi5ImageForButton: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  collectedHi5: PropTypes.string.isRequired,
};

export default React.memo(LeftPanelComponent);
