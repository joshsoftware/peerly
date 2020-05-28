import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const RowComponent = React.memo(Row);
const ColComponent = React.memo(Col);
const ContainerComponent = React.memo(Container);

export {
  RowComponent as Row,
  ColComponent as Col,
  ContainerComponent as Container,
};
