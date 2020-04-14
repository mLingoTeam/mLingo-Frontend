import React from "react";
import { FormGroup, Label } from "reactstrap";

const FormField = ({ set }) => {
  return (
    <FormGroup className="col-12 mb-3">
      <Label for={set.id}>
        {set.label}
      </Label>
      <input
        className="col-12 col-lg-12"
        type={set.type}
        name={set.name}
        id={set.id}
        placeholder={set.placeholder}
        onChange={set.function}
        key={set.name}
        required
      />
    </FormGroup>
  );
};

export default FormField;
