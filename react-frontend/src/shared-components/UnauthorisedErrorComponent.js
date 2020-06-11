import React from "react";

function UnauthorisedErrorComponent() {
  return <p>You dont have access to this page</p>;
}

export default React.memo(UnauthorisedErrorComponent);
