import React from "react";
import PropTypes from "prop-types";

import PeerlyLogo from "shared-components/peerly-logo/PeerlyLogo";
import PeerlyTextComponent from "shared-components/peerly-logo/PeerlyTextComponent";

const PeerlyTextAndLogo = ({ theme, fontSize }) => (
  <>
    <div data-testid="peerlyLogoComponent">
      <PeerlyLogo theme={theme} fontSize={fontSize} />
    </div>
    <div className="text-center">
      <PeerlyTextComponent theme={theme} fontSize={fontSize} />
    </div>
  </>
);

PeerlyTextAndLogo.defaultProps = {
  theme: "dark",
  fontSize: "48px",
};

PeerlyTextAndLogo.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  fontSize: PropTypes.string,
};

export default React.memo(PeerlyTextAndLogo);
