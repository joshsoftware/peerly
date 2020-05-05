import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const redirectTimeout = 3000;

function SessionFallback() {
  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, redirectTimeout);
  }, [history]);

  return <p>session timed out!! Redirecting to login page</p>;
}

export default SessionFallback;
