import React from "react";
import { Row, Col, Label, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      name: "AM",
      time: "1 min ago",
      text:
        "recognition text:welcome to bonusly @sahil+bonasuly ! we are recognistion you with +25",
      core: "welcome to bonusly",
    },
    {
      hi5: "2",
      name: "JB",
      time: "2 min ago",
      text:
        "recognition text:welcome to bonusly @sahil+bonasuly ! we are recognistion you with +25",
      core: "welcome to bonusly",
    },
    {
      hi5: "3",
      name: "OH",
      time: "3 min ago",
      text:
        "recognition text:welcome to bonusly @sahil+bonasuly ! we are recognistion you with +25",
      core: "welcome to bonusly",
    },
  ];
  return (
    <Container>
      <Row>
        <Col xs="3"></Col>
        <Col>
          {persons.map((person) => (
            <Row
              className="border border-primary mt-5 bg-light grey"
              key={person.id}
            >
              <Col>
                <Row className="mt-2 d-flex justify-content-around mt-2">
                  <Button className="bg-success">
                    <h6>+{person.hi5}</h6>
                  </Button>
                  <Button>
                    <h6>{person.name}</h6>
                  </Button>
                  <Label className="text-muted">{person.time}</Label>
                  <Menu>
                    <MenuButton className="btn bg-light grey">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem></MenuItem>
                      <MenuLink to="view"></MenuLink>
                    </MenuList>
                  </Menu>
                </Row>
                <Row className="h-50 p-3 border border-success ml-5 mr-5 mt-2 font-italic text-left">
                  <h5>{person.text}</h5>
                </Row>
                <Row className="ml-5 mt-2 mb-2">
                  <Label className="text-primary font-weight-lighter">
                    <h5>#{person.core}</h5>
                  </Label>
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
