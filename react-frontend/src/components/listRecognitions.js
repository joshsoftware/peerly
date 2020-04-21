import React from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardFooter, CardBody, CardText } from "reactstrap";
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
            <Card
              className="border border-primary mt-4 bg-light grey"
              key={person.id}
            >
              <CardHeader className="d-flex justify-content-around">
                <Button className="bg-success btn-sm">
                  <h5>+{person.hi5}</h5>
                </Button>
                <Button className="btn-sm bg-primary">
                  <h5>{person.name}</h5>
                </Button>
                <CardText className="text-muted">{person.time}</CardText>
                <Menu>
                  <MenuButton className="btn bg-light grey">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem></MenuItem>
                    <MenuLink to="view"></MenuLink>
                  </MenuList>
                </Menu>
              </CardHeader>
              <CardBody className="h-50 p-3 ml-5 mr-5 font-italic text-left">
                <CardText>
                  <h5>{person.text}</h5>
                </CardText>
              </CardBody>
              <CardFooter className="d-flex content-left">
                <Form.Label className="text-primary font-weight-lighter">
                  <h5>#{person.core}</h5>
                </Form.Label>
              </CardFooter>
            </Card>
          ))}
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
};
export default ListRecognition;
