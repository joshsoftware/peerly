import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Card } from "core-components/grid/GridComponent";
import { Form } from "core-components/form/FormComponent";
import { Button } from "core-components/button/ButtonComponent";
import AsyncSelect from "core-components/autocomplete/AutoCompleteComponent";

const CardBody = styled(Card.Body)`
  width: auto;
  padding: 0%;
`;

const Header = styled.div`
  width: auto;
  height: 20%;
  background: #87bcbf;
  border-radius: 50px 50px 0px 0px;
  text-align: center;
`;

const FilterCard = styled(Card)`
  border-radius: 50px;
`;

const FilterRecognitionCard = ({
  coreValueList,
  givenForList,
  givenByList,
  promiseCoreValueOptions,
  promiseGivenByOptions,
  promiseGivenForOptions,
  onSubmit,
}) => (
  <FilterCard className="h-100">
    <CardBody>
      <Header className="text -center h4">Filter</Header>
      <Form className="p-3" onSubmit={onSubmit} data-testid="filterform">
        <Form.Group controlId="filterCoreValue">
          <Form.Label>Core Value</Form.Label>
          <AsyncSelect
            defaultOptions={coreValueList}
            loadOptions={promiseCoreValueOptions}
            name="core_value"
            placeholder="select Core Value"
          />
        </Form.Group>
        <Form.Group controlId="filterGivenFor">
          <Form.Label>Given For</Form.Label>
          <AsyncSelect
            defaultOptions={givenForList}
            loadOptions={promiseGivenForOptions}
            name="given_for"
            placeholder="select given for"
          />
        </Form.Group>

        <Form.Group controlId="filterGivenBy">
          <Form.Label>Given By</Form.Label>
          <AsyncSelect
            defaultOptions={givenByList}
            loadOptions={promiseGivenByOptions}
            name="given_by"
            placeholder="select given by"
          />
        </Form.Group>
        <div className="text-center">
          <Button type="submit" variant="success">
            Apply Filter
          </Button>
        </div>
      </Form>
    </CardBody>
  </FilterCard>
);

FilterRecognitionCard.propTypes = {
  coreValueList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any.isRequired,
      value: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string,
      }),
    })
  ),
  givenForList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any.isRequired,
      value: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string,
      }),
    })
  ),
  givenByList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any.isRequired,
      value: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      }),
    })
  ),
  promiseCoreValueOptions: PropTypes.func.isRequired,
  promiseGivenForOptions: PropTypes.func.isRequired,
  promiseGivenByOptions: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FilterRecognitionCard;
