import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ImageComponent from "core-components/image/ImageComponent";

const CoreValueImage = styled(ImageComponent)`
  max-width: 70px;
  min-height: 100px;
  border-radius: 10px;
  text-align: center;
  border-radius: 20px;
  overflow: hidden;
`;

const CoreValueComponent = ({
  coreValueId,
  coreValueImageSrc,
  coreValueName,
}) => {
  const onClick = () => {
    //todo
  };
  return (
    <div className="text-center">
      <div>
        <CoreValueImage
          id={coreValueId}
          src={coreValueImageSrc}
          alt="Core value"
          onClick={onClick}
        />
      </div>
      <div>{coreValueName}</div>
    </div>
  );
};

CoreValueComponent.defaultProps = {
  backgroundColor: "var(--rust)",
};

CoreValueComponent.propTypes = {
  coreValueId: PropTypes.number,
  coreValueImageSrc: PropTypes.string.isRequired,
  coreValueName: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default CoreValueComponent;
