import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PeerlyTextAndLogo from "shared-components/peerly-logo/PeerlyTextAndLogo";
import InformativeTextComponent from "login/InformativeTextComponent";
import LoginImageComponent from "login/LoginImageComponent";

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--atomic)" : "var(--white)"};
`;

const PreLoginDashboardComponent = ({ theme, className }) => (
  <Wrapper
    theme={theme}
    className={`d-sm-block d-xs-block d-md-none flex-column d-flex justify-content-around ${className}`}
    data-testid="officeInfo"
  >
    <div>
      <PeerlyTextAndLogo theme={theme} />
    </div>
    <LoginImageComponent />
    <InformativeTextComponent
      theme={theme}
      informativeText="Lets Create the Office Positive"
      encouragementThought="Encouragement Driven"
    />
  </Wrapper>
);

PreLoginDashboardComponent.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  className: PropTypes.string,
};

PreLoginDashboardComponent.defaultProps = {
  theme: "dark",
};

export default React.memo(PreLoginDashboardComponent);
