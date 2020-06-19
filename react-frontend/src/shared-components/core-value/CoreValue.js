import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ImageComponent from "core-components/image/ImageComponent";

const CoreValueImage = styled(ImageComponent)`
  width: 70px;
  height: 100px;
  border-radius: 10px;
  text-align: center;
  border-radius: 20px;
  overflow: hidden;
`;
const Wrapper = styled.div`
  width: 80px;
  height: 120px;
`;
const CoreValueComponent = ({
  coreValueId,
  coreValueName,
  coreValueImageSrc,
  setCoreValueId,
}) => {
  const onClick = () => {
    setCoreValueId(coreValueId);
  };
  return (
    <Wrapper className="text-center" onClick={onClick}>
      <div>
        <CoreValueImage
          id={coreValueId}
          src={coreValueImageSrc}
          alt="Core value"
        />
      </div>
      <div>{coreValueName}</div>
    </Wrapper>
  );
};

CoreValueComponent.defaultProps = {
  backgroundColor: "var(--rust)",
};

CoreValueComponent.propTypes = {
  coreValueId: PropTypes.number,
  coreValueName: PropTypes.string,
  description: PropTypes.string,
  parent_core_value_id: PropTypes.number,
  org_id: PropTypes.number,
  coreValueImageSrc: PropTypes.string,
  setCoreValueId: PropTypes.func,
};

export default CoreValueComponent;
