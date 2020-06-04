import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import CoreValueIcon from "shared-components/core-value-icon/coreValueIconComponent"; //todo: will work after core value addition
import CoreValueText from "shared-components/core-value/CoreValueText";

const Wrapper = Styled.div`
  max-width: 70px;
  min-height: 100px;
  border-radius: 10px;
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  opacity: 1;
`;

const CoreValueComponent = ({ coreValueName, fontSize, backgroundColor }) => {
  const onClick = () => {
    // todo
  };
  return (
    <Wrapper
      className="m-auto"
      onClick={onClick}
      backgroundColor={backgroundColor}
    >
      <CoreValueIcon size="50" color="red" />
      <CoreValueText coreValueName={coreValueName} fontSize={fontSize} />
    </Wrapper>
  );
};

CoreValueComponent.defaultProps = {
  backgroundColor: "var(--rust)",
};

CoreValueComponent.propTypes = {
  coreValueName: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default CoreValueComponent;
