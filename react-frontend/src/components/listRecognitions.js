
import React from "react";
import { Row, Col, Label, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MenuButton,
  MenuList,
  MenuItem,
  MenuLink,
  Menu,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
const ListRecognition = () => {
  const persons = [
    {
      hi5: "1",
      name: "avinash",
      time: "1 min ago",
      text: "recognition text",
      core: "core value",
    },
    {
      hi5: "2",
      name: "jitu",
      time: "2 min ago",
      text: "recognition text2",
      core: "core value",
    },
    {
      hi5: "3",
      name: "onkar",
      time: "3 min ago",
      text: " recognition text3",
      core: "core value",
    },
  ];
  return (
    <Container>
      <Row>
        <Col xs="3"></Col>
        <Col>
          {persons.map((person) => (
            <Row className="border mt-5 bg-info" key={person.id}>
              <Col>
                <Row className="mt-2 d-flex justify-content-around mt-2">
                  <Button className="bg-success">+{person.hi5}</Button>
                  <Label>{person.name}</Label>
                  <Label>{person.time}</Label>
                  <Menu>
                    <MenuButton className="btn bg-light grey">
                      options
                    </MenuButton>
                    <MenuList>
                      <MenuItem>downlode</MenuItem>
                      <MenuLink to="view">view</MenuLink>
                    </MenuList>
                  </Menu>
                </Row>
                <Row className="h-50 p-3 border ml-5 mr-5 mt-2 ">
                  <p>{person.text}</p>
                </Row>
                <Row className="d-flex justify-content-around mt-2 mb-5">
                  <Label>{person.core}</Label>
                  <Button className="bg-danger">comment</Button>
                </Row>
              </Col>
            </Row>
          ))}
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
};
export default ListRecognition;
