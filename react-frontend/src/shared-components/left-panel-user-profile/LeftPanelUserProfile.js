import React from "react";
import styled from "styled-components";

import { Card } from "core-components/card/card";
import Img from "shared-components/user-image-name/UserImageName";
import { Row } from "core-components/grid/GridComponent";
import PlusSign from "shared-components/plus-sign/PlusSign";

const ButtonComp = styled.div`
  background: transparent
    url("https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3Afa4d001b-9437-454d-9251-b1f4057910a7&params=version%3A0&token=1591073643_da39a3ee_3cbad380723b213550e5fc5179e925e038cf581d&api_key=CometServer1")
    90% 60% no-repeat padding-box;
  opacity: 1;
  box-shadow: 0px 3px 6px #0000004e;
  width: 45px;
  height: 45px;
  background-color: #d97d54;
  border: none;
  border-radius: 50%;
  margin-top: 7.5px;
  margin-left: 7.5px;
`;

const Plus = styled.div`
  position: absolute;
  margin-left: 10px;
  margin-top: 8px;
  font-size: 23px;
  color: white;
`;

const RoundCircle = styled.div`
  background: #fffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000004e;
  opacity: 1;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: "flex";
  justifycontent: "center";
  alignitems: "center";
`;
const CardStyle = styled(Card)`
"border-top-left-radius": "10%";
"height": "100vh";
 "border-top-right-radius": "10%";
 "border": "2px solid black";
`;

const LeftPanelUserProfile = () => {
  const onClick = () => {
    onClick();
  };
  return (
    <CardStyle>
      <Row className="justify-content-center">
        <Img
          className="justify-content-center"
          text="Employee Name"
          imageSrc="https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3Ae4e32c39-1480-4122-aed7-6e9cf0871677&params=version%3A0&token=1591073643_da39a3ee_3cbad380723b213550e5fc5179e925e038cf581d&api_key=CometServer1"
        />
      </Row>
      <Row className="justify-content-center">
        <Img
          className="justify-content-center"
          text="5 collected"
          imageSrc="https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3A4f24bbbe-5873-4fcb-8c68-7b9f653271bc&params=version%3A1&token=1591073643_da39a3ee_3cbad380723b213550e5fc5179e925e038cf581d&api_key=CometServer1"
        />
      </Row>
      <Row className="justify-content-center">
        <RoundCircle>
          <ButtonComp onClick={onClick}>
            <Plus>
              <PlusSign />
            </Plus>
          </ButtonComp>
        </RoundCircle>
      </Row>
    </CardStyle>
  );
};

export default LeftPanelUserProfile;
