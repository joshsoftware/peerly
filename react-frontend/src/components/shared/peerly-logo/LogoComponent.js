import React from "react";
import PropTypes from "prop-types";

import LabelComponent from "components/core/Label/LabelComponent";

const LogoComponent = ({
  peerlyLogoClassName,
  text,
  plusIconClassName,
  peerlyTextClassName,
}) => (
  <div data-testid="peerlyLogoComponent" className={peerlyLogoClassName}>
    <div>
      <LabelComponent text="+" className={plusIconClassName} />
    </div>
    <div>
      <LabelComponent text={text} className={peerlyTextClassName} />
    </div>
  </div>
);

LogoComponent.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  peerlyTextClassName: PropTypes.string,
  plusIconClassName: PropTypes.string,
  peerlyLogoClassName: PropTypes.string,
};

export default LogoComponent;
