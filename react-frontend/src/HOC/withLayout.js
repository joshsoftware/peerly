import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "core-components/grid/GridComponent";
import TopNavbar from "shared-components/layout/TopNavbarContainer";
import Sidebar from "shared-components/left-panel/LeftPanelContainer";

const withLayout = (WrappedComponent, includeNavbar, includeSidebar) => (
  props
) => {
  return (
    <div
      style={{
        "background-color": "var(--grey)",
        height: "100vh",
        width: "100%",
      }}
    >
      <Row>{includeNavbar && <TopNavbar />}</Row>
      <Row className="mt-3 d-flex justify-content-center">
        <Col md={3} className="">
          {includeSidebar && <Sidebar />}
        </Col>
        <Col md={7}>
          <WrappedComponent {...props} />
        </Col>
      </Row>
    </div>
  );
};

withLayout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  includeNavbar: PropTypes.bool.isRequired,
  includeSidebar: PropTypes.bool.isRequired,
};

export default withLayout;
