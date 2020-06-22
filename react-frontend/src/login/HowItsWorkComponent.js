import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  color: var(--white);
  background-color: var(--sage);
`;

const HowItsWorkComponent = () => (
  <Wrapper className="text-center">
    <h1>How Its Work</h1>
  </Wrapper>
);

export default React.memo(HowItsWorkComponent);
