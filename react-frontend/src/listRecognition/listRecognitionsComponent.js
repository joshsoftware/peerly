import React from "react";
import { Row, Col, Button, Container, Card, Image } from "react-bootstrap";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";
import "@reach/menu-button/styles.css";

const ListRecognitionsComponent = () => {
  return (
    <Container className="rounded border border-secondary">
      <Card className="mt-2 ml-2 mr-2 mb-2 rounded border border-secondary">
        <Card.Body>
          <Row>
            <Col lg={8}>
              <Row>
                <Col lg={3}>
                  <Image src={require("./boy-524512_1280.png")} roundedCircle />
                </Col>
                <Col lg={7}>avinash mane</Col>
                <Col lg={2}>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </Col>
              </Row>
              <Row>
                <Card.Text className="mt-2 ml-2 mr-2 mb-2 rounded border border-secondary">
                  hii
                </Card.Text>
              </Row>
            </Col>
            <Col lg={4}>image</Col>
          </Row>
          <Row></Row>
        </Card.Body>
        <Card.Footer>
          <Button></Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};
ListRecognitionsComponent.propTypes = {
  list: PropTypes.array,
};
export default ListRecognitionsComponent;
