import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PlusSign from "shared-components/plus-sign/PlusSign";

const Logo = styled.div`
  text-align: center;
  margin-top: 15px;
  width: 50px;
  height: 50px;
  border: 3px solid
    ${({ theme }) => (theme === "dark" ? "var(--white)" : "var(--atomic)")};
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--atomic)" : "var(--white)"};
  transform: rotate(45deg);
`;

const PeerlyLogo = ({ theme, fontSize }) => (
  <Logo theme={theme} className="mx-auto" data-testid="Logo">
    <PlusSign theme={theme} cross fontSize={fontSize} />
  </Logo>
);

PeerlyLogo.defaultProps = {
  theme: "dark",
  fontSize: "30px",
};

PeerlyLogo.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  fontSize: PropTypes.string,
};

export default React.memo(PeerlyLogo);
