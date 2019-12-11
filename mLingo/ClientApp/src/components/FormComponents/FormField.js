import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const FormField = ({ set }) => {
  return (
    <FormGroup className="col-12 mb-3">
      <Label for={set.id} className="col-2">
        {set.name}
      </Label>
      <Input
        className="col-12 col-lg-12"
        type={set.type}
        name={set.name}
        id={set.id}
        placeholder={set.placeholder}
        onChange={set.function}
        required
      />
    </FormGroup>
  );
};

export default FormField;
