import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const HrLine = styled.hr`
  width: 10%;
  background: ${({ theme }) =>
    theme === "dark" ? "var(--white)" : "var(--black)"};
`;

const Div = styled.div`
  color: ${({ theme }) => (theme === "dark" ? "var(--white)" : "var(--black)")};
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--black)" : "var(--white)"};
`;

const InformativeTextComponent = ({
  theme,
  className,
  informativeText,
  encouragementThought,
}) => (
  <Div theme={theme} className={className} data-testid="info">
    <h3>{informativeText}</h3>
    <HrLine theme={theme} data-testid="hrLine" />
    <h6>{encouragementThought}</h6>
  </Div>
);

InformativeTextComponent.defaultProps = {
  informativeText: "Lets Create the Office Positive",
  encouragementThought: "Encouragement Driven",
  theme: "dark",
};

InformativeTextComponent.propTypes = {
  className: PropTypes.string,
  informativeText: PropTypes.string.isRequired,
  encouragementThought: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(["dark", "light"]),
};

export default React.memo(InformativeTextComponent);
