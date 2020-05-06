import React from "react";
import PropTypes from "prop-types";

import LabelComponent from "../core-components/LabelComponent";

const LogoComponent = ({ className, text }) => (
  <div className={className}>
    <LabelComponent text="+" />
    <br />
    <LabelComponent text={text} />
  </div>
);

LogoComponent.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default LogoComponent;
