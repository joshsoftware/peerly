import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PlusSignWrapper = styled.div`
  transform: ${({ cross }) =>
    cross === true ? "rotate(45deg)" : "rotate(0deg)"};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ theme }) => (theme === "dark" ? "var(--white)" : "var(--black)")};
`;

const PlusSign = ({ theme, cross, fontSize }) => (
  <PlusSignWrapper
    theme={theme}
    cross={cross}
    fontSize={fontSize}
    data-testid="plusSignText"
  >
    +
  </PlusSignWrapper>
);

PlusSign.defaultProps = {
  theme: "dark",
  fontSize: "48px",
  cross: false,
};

PlusSign.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  cross: PropTypes.bool,
  fontSize: PropTypes.string,
};

export default React.memo(PlusSign);
