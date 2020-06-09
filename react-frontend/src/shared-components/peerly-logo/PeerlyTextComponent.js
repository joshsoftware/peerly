import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PeerlyText = styled.div`
  color: ${({ theme }) =>
    theme === "dark" ? "var(--white)" : "var(--atomic)"};
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--atomic)" : "var(--white)"};
  font-size: ${({ fontSize }) => fontSize};
`;

const PeerlyTextComponent = ({ theme, fontSize }) => (
  <PeerlyText
    theme={theme}
    fontSize={fontSize}
    data-testid="PeerlyTextComponents"
  >
    Peerly
  </PeerlyText>
);

PeerlyTextComponent.defaultProps = {
  theme: "dark",
  fontSize: "48px",
};

PeerlyTextComponent.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  fontSize: PropTypes.string,
};

export default React.memo(PeerlyTextComponent);
