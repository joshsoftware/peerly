import React from "react";
import PropTypes from "prop-types";

import { Card } from "core-components/card/card";
import CoreValue from "create-recognition/coreValues"
import {Row, Col} from "core-components/grid/GridComponent"

const coreValues = [
  {
    id: 1,
    coreValueName: "core Value Name 1",
  },
  {
    id: 2,
    coreValueName: "core Value Name 2",
  },
  {
    id: 3,
    coreValueName: "core Value Name 3",
  },
  {
    id: 4,
    coreValueName: "core Value Name 4",
  }
]

const CreateRecognitionCardBody = () =>
  (
    <Card.Body className="d-flex flex row justify-content-around">
      <CoreValue coreValues={coreValues}/>
    </Card.Body>
  )

CreateRecognitionCardBody.propTypes = {

};

export default CreateRecognitionCardBody;
