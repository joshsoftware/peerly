import React from "react";

function InternalServerErrorComponent() {
  return <p>Internal server error</p>;
}

export default React.memo(InternalServerErrorComponent);
