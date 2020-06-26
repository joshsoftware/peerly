import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { REDIRECT_TIMEOUT } from "constants/appConstants";
import styled from "styled-components";
const Wrapper = styled.div`
  height: 100vh;
`;

const ErrorCode = styled.h1`
  font-size: 1000%;
`;
function SessionTimeoutComponent() {
  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, REDIRECT_TIMEOUT);
  }, [history]);

  return (
    <Wrapper className="d-flex justify-content-center align-items-center">
      <div>
        <ErrorCode className="font-weight-bold text-muted">401</ErrorCode>
        <h2>session timed out!! Redirecting to login page</h2>
      </div>
    </Wrapper>
  );
}

export default React.memo(SessionTimeoutComponent);
