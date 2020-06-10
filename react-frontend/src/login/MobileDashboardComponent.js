import React from "react";
import styled from "styled-components";

import PeerlyTextAndLogo from "shared-components/peerly-logo/PeerlyTextAndLogo";
import InformativeTextComponent from "login/InformativeTextComponent";
import LoginImageComponent from "login/LoginImageComponent";

const Wrapper = styled.div`
  height: 100vh;
  background-color: var(--atomic);
`;

const MobileDashboardComponent = () => (
  <Wrapper className="d-md-none flex-column d-flex justify-content-around">
    <PeerlyTextAndLogo theme="dark" />
    <LoginImageComponent />
    <InformativeTextComponent
      theme="dark"
      informativeText="Lets Create the Office Positive"
      encouragementThought="Encouragement Driven"
    />
  </Wrapper>
);

export default React.memo(MobileDashboardComponent);
