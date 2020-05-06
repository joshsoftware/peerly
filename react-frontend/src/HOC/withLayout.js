import React from "react";
import PropTypes from "prop-types";

import TopNavbar from "sharedComponents/TopNavbar";
import Sidebar from "sharedComponents/Sidebar";

const withLayout = (WrappedComponent, includeNavbar, includeSidebar) => (
  props
) => {
  return (
    <>
      {includeNavbar && <TopNavbar />}
      <WrappedComponent {...props} />
      {includeSidebar && <Sidebar />}
    </>
  );
};

withLayout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  includeNavbar: PropTypes.bool.isRequired,
  includeSidebar: PropTypes.bool.isRequired,
};

export default withLayout;
