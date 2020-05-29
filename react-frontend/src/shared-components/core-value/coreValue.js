import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import { Form } from "core-components/form/FormComponent";

const Wrapper = Styled.div`
max-width:75px;
min-height:75px;
border-radius: 5px;
border: 3px solid black;
display: flex;
text-align: center;
font-size: 0.75em;
`;

const CoreValueComponent = ({
  coreValueName,
}) => (
  <Wrapper>
    <Form.Label>
    {coreValueName}
    </Form.Label>
  </Wrapper>
);

CoreValueComponent.propTypes = {
  coreValueName: PropTypes.string.isRequired,
};

export default CoreValueComponent;
