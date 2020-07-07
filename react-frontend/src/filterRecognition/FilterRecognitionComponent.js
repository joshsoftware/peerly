import React from "react";
import PropTypes from "prop-types";

import { Card } from "core-components/card/CardComponent";
import { Button } from "core-components/button/ButtonComponent";
import { Form } from "core-components/form/FormComponent";
import AsyncSelect from "core-components/auto-complete/AutoComplete";
import CoreValues from "../shared-components/core-value/CoreValues";
import styled from "styled-components";

const CardComponent = styled(Card)`
  border: none;
`;

const FilterRecognitionComponent = ({
  coreValues,
  setCoreValueId,
  promiseOptions,
  handleInputChange,
  onSubmit,
}) => {
  return (
    <CardComponent className="text-center">
      <div className="d-flex justify-content-around flex-row text-dark">
        <CoreValues coreValues={coreValues} setCoreValueId={setCoreValueId} />
      </div>
      <Form className="p-2 mt-5" onSubmit={onSubmit} data-testid="filterform">
        <Form.Group controlId="filterGivenFor">
          <AsyncSelect
            loadOptions={promiseOptions}
            name="given_for"
            placeholder="select given for"
            onInputChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="filterGivenBy">
          <AsyncSelect
            loadOptions={promiseOptions}
            name="given_by"
            placeholder="select given by"
            onInputChange={handleInputChange}
          />
        </Form.Group>
        <div className="text-center">
          <Button type="submit" variant="success">
            Apply Filter
          </Button>
        </div>
      </Form>
    </CardComponent>
  );
};

FilterRecognitionComponent.propTypes = {
  coreValues: PropTypes.array,
  setCoreValueId: PropTypes.number,
  userList: PropTypes.array,
  givenByList: PropTypes.array,
  promiseOptions: PropTypes.func,
  handleInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default React.memo(FilterRecognitionComponent);
