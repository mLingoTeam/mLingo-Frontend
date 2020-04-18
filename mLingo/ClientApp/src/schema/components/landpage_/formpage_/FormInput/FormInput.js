import React from "react";

const FormInput = ({ set }) => {
  return (
    <div className="forminput__container" key={set.name}>
      <label for={set.id}>
        {set.label}
      </label>
      <input
        className="forminput__input"
        type={set.type}
        name={set.name}
        id={set.id}
        placeholder={set.placeholder}
        onChange={set.function}
        required
      />
    </div>
  );
};

export default FormInput;
