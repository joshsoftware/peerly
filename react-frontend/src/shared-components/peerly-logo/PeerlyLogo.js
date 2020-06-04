import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PlusSign from "shared-components/plus-sign/PlusSign";

const Logo = styled.div`
  width: 83px;
  height: 83px;
  border: 3px solid
    ${({ theme }) => (theme === "dark" ? "var(--white)" : "var(--black)")};
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--black)" : "var(--white)"};
  transform: rotate(45deg);
`;

const PeerlyLogo = ({ theme, fontSize }) => (
  <Logo theme={theme} className="mx-auto">
    <PlusSign theme={theme} cross fontSize={fontSize} />
  </Logo>
);

PeerlyLogo.defaultProps = {
  theme: "dark",
  fontSize: "48px",
};

PeerlyLogo.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  fontSize: PropTypes.string,
};

export default React.memo(PeerlyLogo);
