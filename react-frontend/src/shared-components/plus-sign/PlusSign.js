import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PlusSignWrapper = styled.div`
   {
    transform: ${({ transform }) => transform};
    font-size: ${({ fontSize }) => fontSize};
    color: ${({ theme }) =>
      (theme.variant === "dark" && "var(--white)") ||
      (theme.variant === "light" && "var(--black)")};
  }
`;

const PlusSign = ({ theme, transform, fontSize }) => (
  <PlusSignWrapper
    theme={theme}
    transform={transform}
    fontSize={fontSize}
    data-testid="plusSignText"
  >
    +
  </PlusSignWrapper>
);

PlusSign.defaultProps = {
  theme: {
    variant: "dark",
  },
  fontSize: "48px",
};

PlusSign.propTypes = {
  theme: PropTypes.shape({
    text: PropTypes.oneOf(["dark", "light"]),
  }),
  transform: PropTypes.string,
  fontSize: PropTypes.string,
};

export default React.memo(PlusSign);
