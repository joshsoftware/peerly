import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";
import "@reach/menu-button/styles.css";
import LabelComponent from "../core-component/lableComponent";
import ImageComponent from "./imageComponent";

const CardComponent = (props) => {
  const { object } = props;

  return (
    <Card className="mt-4 ml-2 mr-2 shadow p-3 mb-4 rounded border border-secondary bg-light grey">
      <Card.Body>
        <Row>
          <Col md={8}>
            <Row>
              <Col md={3}>
                <ImageComponent img={object.recognition_for.img} />
              </Col>
              <Col md={7}>
                <Row>
                  <LabelComponent
                    labelText={object.recognition_for.name}
                    className="font-weight-bold"
                  />
                </Row>
                <Row>
                  got high-five for
                  <LabelComponent
                    labelText={object.core_value_text}
                    className="ml-1 font-weight-bold"
                  />
                </Row>
                <Row>
                  <LabelComponent labelText={object.recognistion_on} />
                </Row>
              </Col>
              <Col md={2}>
                <Button className="bg-secondary">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={1}></Col>
              <Col className="mt-2 mr-2 mb-2 rounded border border-secondary">
                <Card.Text className="font-italic mt-2 mb-2">
                  {object.recognistion_text}
                </Card.Text>
              </Col>
            </Row>
            <Row className="d-flex justify-content-end ">
              <LabelComponent
                labelText={object.recognition_by.name}
                className="font-weight-bold"
              />
              <ImageComponent img={object.recognition_by.img} />
            </Row>
          </Col>
          <Col md={4}>
            <ImageComponent img={object.pixelimg} shape="rounded" />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-left ">
        <LabelComponent labelText="+1" className="font-weight-bold" />
        <ImageComponent img={object.hi5img} />
      </Card.Footer>
    </Card>
  );
};
CardComponent.propTypes = {
  object: PropTypes.object.isRequired,
};
export default CardComponent;
