import React from "react";
import { Form } from "react-bootstrap";

const Label = React.memo(Form.Label);
const FormComponent = React.memo(Form);

export default FormComponent;
export { Label };
