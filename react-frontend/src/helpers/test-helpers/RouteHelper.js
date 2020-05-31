import React from "react";
import PropTypes from "prop-types";

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const renderWithRouter = (WrappedComponent, props) =>
  render(
    <MemoryRouter>
      <WrappedComponent {...props} />
    </MemoryRouter>
  );

renderWithRouter.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  props: PropTypes.object,
};

export default renderWithRouter;
