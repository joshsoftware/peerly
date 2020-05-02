import React from "react";

import Topnav from "Topnav";
import Sidebar from "Sidebar";

const withLayout = (Component) => (props) => {
  return (
    <>
      <Topnav />
      <Component {...props} />
      <Sidebar />
    </>
  );
};

export default withLayout;
