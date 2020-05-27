import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LabelComponent from "core-components/label/LabelComponent";

const Border = styled.fieldset`
  border: 1px solid #dae2e3;
  border-radius: 11px;
  opacity: 1;
`;

const Legend = styled.legend`
  width: auto;
  margin-left: 10%;
`;

const RecognitionTextComponent = ({ text, className }) => (
  <Border className={className}>
    <Legend>“</Legend>
    <LabelComponent text={text} className="p-2" />
  </Border>
);

RecognitionTextComponent.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default React.memo(RecognitionTextComponent);
