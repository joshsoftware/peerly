import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

const Wrapper = Styled.div`
  font-size: ${({ fontSize }) => fontSize};
`;

const CoreValueComponent = ({ coreValueName, fontSize }) => {
  return <Wrapper fontSize={fontSize}>{coreValueName}</Wrapper>;
};

CoreValueComponent.defaultProps = {
  fontSize: "1em",
};

CoreValueComponent.propTypes = {
  coreValueName: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
};

export default CoreValueComponent;
