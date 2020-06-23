import React from "react";
import PropTypes from "prop-types";

import TopNavbar from "shared-components/layout/TopNavbarContainer";
import Sidebar from "shared-components/left-panel/LeftPanelContainer";

const withLayout = (WrappedComponent, includeNavbar, includeSidebar) => (
  props
) => {
  return (
    <div style={{ "background-color": "var(--grey)", height: "100vh" }}>
      {includeNavbar && <TopNavbar />}
      <WrappedComponent {...props} />
      {includeSidebar && <Sidebar />}
    </div>
  );
};

withLayout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  includeNavbar: PropTypes.bool.isRequired,
  includeSidebar: PropTypes.bool.isRequired,
};

export default withLayout;
