import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PeerlyText = styled.div`
   {
    color: ${({ theme }) =>
      (theme.variant === "dark" && "var(--white)") ||
      (theme.variant === "light" && "var(--black)")};
    background-color: ${({ theme }) =>
      (theme.variant === "dark" && "var(--black)") ||
      (theme.variant === "light" && "var(--white)")};
    font-size: ${({ fontSize }) => fontSize};
  }
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
  theme: {
    variant: "dark",
  },
  fontSize: "48px",
};

PeerlyTextComponent.propTypes = {
  theme: PropTypes.shape({
    variant: PropTypes.oneOf(["dark", "light"]),
  }),
  fontSize: PropTypes.string,
};

export default React.memo(PeerlyTextComponent);
