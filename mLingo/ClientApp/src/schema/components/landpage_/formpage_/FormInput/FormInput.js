import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormInput = ({ set }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="forminput__container" key={set.name}>
      <label for={set.id}>
        {set.label}
      </label>
      <div className="passwordinput__input">
        <input
          className=""
          type={ isClicked ? 'text' : set.type}
          name={set.name}
          id={set.id}
          placeholder={set.placeholder}
          onChange={set.function}
          required
        />
        { set.type === 'password' ? <div
         className={`form__eye ${ isClicked ? "form__eye--clicked" : "" }`}
          onClick={ () => { setIsClicked(value => !value) }}>
          { !isClicked ? <FaEyeSlash/> : <FaEye/>}
          </div> : <span></span>}
      </div>
    </div>
  );
};

export default FormInput;
