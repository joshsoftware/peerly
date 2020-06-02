import React from "react";
import styled from "styled-components";

import { Row } from "core-components/grid/GridComponent";
import PlusSign from "shared-components/plus-sign/PlusSign";

const Plus = styled.div`
  & {
    position: absolute;
    width: 64px;
    height: 77px;
    top: 5%;
    left: 5%;
    transform: rotate(45deg);
    font-size: 45px;
    color: var(--peerly-logo);
  }
`;

const Logo = styled.div`
  & {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 32px;
    transform: rotate(45deg);
  }
  &: before {
    content: " ";
    width: 50px;
    height: 50px;
    border: 3px solid var(--peerly-logo);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`;

const PeerlyText = styled.div`
  & {
    position: relative;
    margin-top: 80px;
    color: var(--peerly-logo);
    font-size: 45px;
`;

const LogoComponent = () => (
  <div data-testid="peerlyLogoComponent">
    <Row className="justify-content-center">
      <Logo>
        <Plus>
          <PlusSign />
        </Plus>
      </Logo>
    </Row>
    <Row className="justify-content-center">
      <PeerlyText> Peerly </PeerlyText>
    </Row>
  </div>
);

export default React.memo(LogoComponent);
