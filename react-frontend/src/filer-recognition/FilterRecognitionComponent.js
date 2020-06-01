import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Accordion } from "core-components/accordion/AccordionComponent";
import { Card } from "core-components/grid/GridComponent";
import { Navbar } from "core-components/navbar/NavbarComponent";
import ListOfFilterElementComponent from "filer-recognition/ListOfFilterElementComponent";
import { Button, ButtonGroup } from "core-components/button/ButtonComponent";

const CardBody = styled(Card.Body)`
  width: 50vh;
`;
const NavbarCollapse = styled(Navbar.Collapse)``;

const FilterRecognitionComponent = ({ list }) => (
  <Navbar bg="light" expand="sm">
    <Navbar.Brand>Peerly</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <NavbarCollapse id="basic-navbar-nav">
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Core_value
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <CardBody>
              <ListOfFilterElementComponent name="core_value" list={list} />
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">Prev</Button>
                <Button variant="secondary">Next</Button>
              </ButtonGroup>
            </CardBody>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Given For
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <CardBody>
              <ListOfFilterElementComponent name="given_for" list={list} />
            </CardBody>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Given By
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <CardBody>
              <ListOfFilterElementComponent name="given_by" list={list} />
            </CardBody>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </NavbarCollapse>
  </Navbar>
);

FilterRecognitionComponent.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string,
        text: PropTypes.string,
      })
    )
  ),
};

export default FilterRecognitionComponent;
