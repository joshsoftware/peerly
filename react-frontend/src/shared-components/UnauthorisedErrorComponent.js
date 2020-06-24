import React from "react";
import styled from "styled-components";
import { Button } from "core-components/button/ButtonComponent";

const Wrapper = styled.div`
  height: 100vh;
`;

const ErrorCode = styled.h1`
  font-size: 1000%;
`;

function UnauthorisedErrorComponent() {
  return (
    <Wrapper className="d-flex justify-content-center align-items-center">
      <div>
        <ErrorCode className="font-weight-bold text-muted">401</ErrorCode>
        <h2>Oops! You dont have access to this page</h2>
        <p>
          Sorry but the page you are trying to access is not allowing you, this
          page allow only authorized users
        </p>
        <Button>Go To Homepage</Button>
      </div>
    </Wrapper>
  );
}

export default React.memo(UnauthorisedErrorComponent);
