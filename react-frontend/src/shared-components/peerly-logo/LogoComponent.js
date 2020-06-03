import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
    color: ${({ theme }) =>
      (theme.text === "dark" && "var(--black)") ||
      (theme.text === "light" && "var(--white)")};
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
    border: 3px solid
      ${({ theme }) =>
        (theme.text === "dark" && "var(--black)") ||
        (theme.text === "light" && "var(--white)")};
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
    color: ${({ theme }) =>
      (theme.text === "dark" && "var(--black)") ||
      (theme.text === "light" && "var(--white)")};
    font-size: 45px;
`;

const LogoComponent = ({ theme }) => (
  <div data-testid="peerlyLogoComponent">
    <Row className="justify-content-center">
      <Logo theme={theme}>
        <Plus theme={theme}>
          <PlusSign />
        </Plus>
      </Logo>
    </Row>
    <Row className="justify-content-center">
      <PeerlyText theme={theme}> Peerly </PeerlyText>
    </Row>
  </div>
);

LogoComponent.defaultProps = {
  theme: {
    text: "light",
  },
};

LogoComponent.propTypes = {
  theme: PropTypes.shape({
    text: PropTypes.oneOf(["dark", "light"]),
  }),
};

export default React.memo(LogoComponent);
