import React from "react";
import { Form, Button } from "react-bootstrap";
import { store } from "root/redux-store";
import { useSelector } from "react-redux";

const CoreValueForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    let formData = new FormData(form);
    let coreValueData = {
      org_id: formData.get("orgId"),
      text: formData.get("text"),
      description: formData.get("description"),
    };
    store.dispatch({ type: "CORE_VALUE_API", payload: coreValueData });
  };
  let someVar = useSelector((state) => state.coreValueReducer);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>org_id</Form.Label>
          <Form.Control
            type="number"
            name="orgId"
            placeholder="select org id"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control type="text" name="text" placeholder="enter text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>description</Form.Label>
          <Form.Control
            type="textarea"
            name="description"
            placeholder="enter describtion"
          />
        </Form.Group>
        <Button type="submit">Add Core Values</Button>
      </Form>
      {someVar.map((el, key) => (
        <h1 key={key}>
          id:{el.id}
          <br />
          org_id: {el.org_id}
          <br />
          text: {el.text}
          <br />
          description: {el.description}
          <br />
          parent_core_value_id{el.parent_core_value_id}
        </h1>
      ))}
    </div>
  );
};

export default CoreValueForm;
