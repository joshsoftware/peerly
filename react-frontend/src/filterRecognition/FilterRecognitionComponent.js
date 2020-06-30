import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Card } from "core-components/card/CardComponent";
import { Button } from "core-components/button/ButtonComponent";
import { Form } from "core-components/form/FormComponent";
import AsyncSelect from "core-components/auto-complete/AutoComplete";
import CoreValues from "../shared-components/core-value/CoreValues";

const CardComponent = styled(Card)`
  margin-right: 100px;
  border: none;
`;

const FilterRecognitionComponent = ({
  coreValues,
  setCoreValueId,
  givenForList,
  givenByList,
  promiseGivenByOptions,
  promiseGivenForOptions,
  onSubmit,
}) => {
  return (
    <CardComponent className="text-center">
      <div className="d-flex justify-content-around flex-row text-dark mt-3">
        <CoreValues coreValues={coreValues} setCoreValueId={setCoreValueId} />
      </div>
      <Form className="p-3" onSubmit={onSubmit} data-testid="filterform">
        <Form.Group className="mt-5" controlId="filterGivenFor">
          <Form.Label>Given For</Form.Label>
          <AsyncSelect
            defaultOptions={givenForList}
            loadOptions={promiseGivenForOptions}
            name="given_for"
            placeholder="select given for"
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="filterGivenBy">
          <Form.Label>Given By</Form.Label>
          <AsyncSelect
            defaultOptions={givenByList}
            loadOptions={promiseGivenByOptions}
            name="given_by"
            placeholder="select given by"
          />
        </Form.Group>
        <div className="text-center mt-5">
          <Button type="submit" variant="success">
            Apply Filter
          </Button>
        </div>
      </Form>
      Send a message
    </CardComponent>
  );
};

FilterRecognitionComponent.propTypes = {
  coreValues: PropTypes.array,
  setCoreValueId: PropTypes.number,
  givenForList: PropTypes.array,
  givenByList: PropTypes.array,
  promiseGivenByOptions: PropTypes.func,
  promiseGivenForOptions: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default React.memo(FilterRecognitionComponent);
