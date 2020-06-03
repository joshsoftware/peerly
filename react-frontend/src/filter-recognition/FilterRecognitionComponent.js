import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AsyncSelect from "react-select/async";

import { Card } from "core-components/grid/GridComponent";
import { Navbar } from "core-components/navbar/NavbarComponent";
import { Form } from "core-components/form/FormComponent";
import { Button } from "core-components/button/ButtonComponent";

const CardBody = styled(Card.Body)`
  width: 50vh;
`;

const NavbarCollapse = styled(Navbar.Collapse)``;

const FilterRecognitionComponent = ({
  coreValueList,
  givenForList,
  givenByList,
  promiseCoreValueOptions,
  promiseGivenByOptions,
  promiseGivenForOptions,
  onSubmit,
}) => (
  <Navbar bg="light" expand="true">
    <Navbar.Brand className="">Peerly</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <NavbarCollapse id="basic-navbar-nav" horizontal>
      <Card>
        <Card.Header>Filter</Card.Header>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <AsyncSelect
              defaultOptions={coreValueList}
              loadOptions={promiseCoreValueOptions}
              name="core_value"
              placeholder="select Core Value"
            />
            <AsyncSelect
              defaultOptions={givenForList}
              loadOptions={promiseGivenForOptions}
              name="given_for"
              placeholder="select given for"
            />
            <AsyncSelect
              defaultOptions={givenByList}
              loadOptions={promiseGivenByOptions}
              name="given_by"
              placeholder="select given by"
            />
            <Button type="submit" className="btn-light mt-2">
              Add Filter
            </Button>
          </Form>
        </CardBody>
      </Card>
    </NavbarCollapse>
  </Navbar>
);

FilterRecognitionComponent.propTypes = {
  coreValueList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string,
        text: PropTypes.string,
      })
    )
  ),
  givenForList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string,
        text: PropTypes.string,
      })
    )
  ),
  givenByList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string,
        text: PropTypes.string,
      })
    )
  ),
  promiseCoreValueOptions: PropTypes.func.isRequired,
  promiseGivenForOptions: PropTypes.func.isRequired,
  promiseGivenByOptions: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FilterRecognitionComponent;
