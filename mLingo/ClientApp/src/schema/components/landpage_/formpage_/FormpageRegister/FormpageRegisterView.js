import React from "react";
import FormInput from "../FormInput/FormInput";
import { Link } from 'react-router-dom'
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const FormpageRegisterView = ( { state, fields }) => {

    return (
      <form
        className="form__form"
        onSubmit={e => {
          state.register_account();
          e.preventDefault();
        }}
      >
        <h1 className="form__title">sign up</h1>
        {fields.map(element => (
          <FormInput set={element} />
        ))}

        <button className="form__getstarted green--button register--button">
          get started
        </button>

        <div className="formsocials__container">
          <button className="fbconnect__button"><FaFacebook /> Sign in with Facebook</button>
          <button className="ggconnect__button"><FaGoogle /> Sign in with Google</button>
        </div>
        <div className="form__alreadyaccount">
          <div>Already have an account? &nbsp; </div><Link to='/login'>sign in</Link>
        </div>
      </form>
    )
}

export default FormpageRegisterView;
