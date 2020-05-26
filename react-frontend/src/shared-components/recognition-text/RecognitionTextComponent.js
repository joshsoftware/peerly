import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LabelComponent from "core-components/label/LabelComponent";

const Border = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dae2e3;
  border-radius: 11px;
  opacity: 1;
`;

const TextAreaComponent = ({ text, className }) => (
  <Border>
    <LabelComponent className={className} text={text} />
  </Border>
);

TextAreaComponent.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default TextAreaComponent;
