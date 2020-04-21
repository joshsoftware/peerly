import React, { useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
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
  const [recognistionList, setRecognitionList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  /*const persons = [
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
  ];*/
  try {
    fetch("https://reqres.in/api/users?page=2", {
      method: "GET",
      credentials: "same-origin",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonresponse) => {
        if (jsonresponse.data) {
          setRecognitionList(jsonresponse.data);
        } else {
          setErrorMsg(jsonresponse.message);
          return errorMsg;
        }
      });
  } catch (ex) {
    return "error 405";
  }
  const onClickHi5 = (id) => {
    try {
      fetch("http://3.12.196.3:5000/users" + id, {
        method: "GET",
        credentials: "same-origin",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonresponse) => {
          if (jsonresponse) {
            setRecognitionList(jsonresponse);
          } else {
            setErrorMsg(jsonresponse.message);
            return errorMsg;
          }
        });
    } catch (ex) {
      return "error 405";
    }
  };
  return (
    <Container>
      <Row>
        <Col xs="3"></Col>
        <Col>
          {recognistionList.map((recognistion) => (
            <Card
              className="border border-primary mt-4 bg-light grey"
              key={recognistion.id}
            >
              <CardHeader className="d-flex justify-content-around">
                <Button
                  className="bg-success btn-sm"
                  onClick={() => onClickHi5(recognistion.recognistion_for)}
                >
                  <h5>+{recognistion.hi5_quota_balance}</h5>
                </Button>
                <Button className="btn-sm bg-primary">
                  <h5>{recognistion.display_name}</h5>
                </Button>
                <CardText className="text-muted">
                  {recognistion.recognistion_on}
                </CardText>
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
                  <h5>{recognistion.recognistion_text}</h5>
                </CardText>
              </CardBody>
              <CardFooter className="d-flex content-left">
                <CardText className="text-primary font-weight-lighter">
                  <h5>#{recognistion.core_value_text}</h5>
                </CardText>
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
