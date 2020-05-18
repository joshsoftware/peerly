import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { REDIRECT_TIMEOUT } from "constants/appConstants";

function SessionTimeoutComponent() {
  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, REDIRECT_TIMEOUT);
  }, [history]);

  return <p>session timed out!! Redirecting to login page</p>;
}

export default React.memo(SessionTimeoutComponent);
